import React, {
  Animated,
  View,
  AppStateIOS,
  AlertIOS,
  DeviceEventEmitter,
  InteractionManager,
  PushNotificationIOS,
  Linking,
  StatusBar,
  Settings
} from 'react-native';
import QuickActionsIOS from 'react-native-quick-actions';
import Navigator from '@moonjs/react-native-navigator';
import Notifications from './notifications.react';
import Beacons from './beacons.react';
import setToString from '../lib/settostring';
import SideMenu from 'react-native-side-menu';
import BasketBar from '../basket/bar.react';
import throttle from 'lodash.throttle';
import Menu from './menu.react';
import routes from '../routes';
import makeApi from '../api';
import * as Segment from 'Analytics';

// Load application stylesheet
import appStyle from './app.style';

// Flux
import flux from '../lib/flux/decorate';
import store from './store';

const registerActions = [
  require('./actions'),
  require('../auth/actions'),
  require('../order/actions'),
  require('../user/actions'),
  require('../venues/actions'),
  require('../events/actions'),
  require('../help/actions'),
  require('../products/actions'),
  require('../basket/actions')
];

class App extends React.Component {

  static propTypes = {
    app: React.PropTypes.object.isRequired,
    basket: React.PropTypes.object.isRequired,
    flux: React.PropTypes.object.isRequired,
    isLoggedIn: React.PropTypes.bool.isRequired,
    msg: React.PropTypes.object.isRequired,
    orders: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    venues: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    this.createActions();
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL.bind(this));

    // Handle quick gestures
    DeviceEventEmitter.addListener('quickActionShortcut', ({userInfo}) => {
      this.handleOpenURL({url: userInfo.url});
    });

    PushNotificationIOS.addEventListener('notification', notification => {
      const {link: url, kind, title, inApp} = notification.getData();
      const msg = this.props.msg.notifications[kind];

      // Application is being toggled by notification
      // In this case, let's directly go to handle URL
      if (AppStateIOS.currentState === 'background') {
        return this.handleOpenURL({url});
      }

      // Do not do display alert if:
      // 1. Destination is the same
      // 2. Notification is not flagged as inApp (some of them can be bg only)
      if (!this.shouldHandleOpenURL(url) || !inApp) return;

      // Otherwise, let's show an alert because it did happen during
      // runtime
      AlertIOS.alert(
        title,
        notification.getAlert(),
        [
          {text: msg.dismiss},
          {text: msg.button, onPress: () => this.handleOpenURL({url})}
        ]);
    });

    this.setupQuickActions();

    Linking.getInitialURL().then(url => url && this.handleOpenURL({url}));

    const action = QuickActionsIOS.popInitialAction();
    if (action) {
      this.handleOpenURL({url: action.userInfo.url});
    }

    const notification = PushNotificationIOS.popInitialNotification();
    if (notification) {
      this.handleOpenURL({url: notification.getData().link});
    }

    this.setupRouteChangeListener();

    // Identify users in tracking services on initial launch (when they are logged in)
    if (this.props.user.profile) {
      this.identifyUser(this.props.user.profile);
    }
  }

  /**
   * Check if user is logged in and take an action
   *
   * @description
   * When this component updates, make sure the user is logged in
   * Redirect to login page otherwise. Additional check is done here
   * to force welcome page only when isLoggedIn property has changed
   *
   * When user logs out/in, identify it with Segment.io
   *
   * @param {Object} prevProps - previous props
   */
  componentDidUpdate(prevProps) {
    if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
      this.maybeShowLoginPage();
    }

    if (prevProps.user !== this.props.user) {
      const {isLogoutPending, profileForm, ...user} = this.props.user.toJS();
      Settings.set({
        userDefaults: {user}
      });
    }

    if (prevProps.user.profile !== this.props.user.profile) {
      this.identifyUser(this.props.user.profile);
    }

    // Quick actions should update when
    // either user changes or activeVenue changes
    const shouldUpdateQuickActions = prevProps.user !== this.props.user
      || prevProps.venues.activeVenue !== this.props.venues.activeVenue;

    if (shouldUpdateQuickActions) {
      this.setupQuickActions();
    }

  }

  identifyUser(profile) {
    const payload = profile && profile.toJS
      ? profile.toJS()
      : profile;

    if (payload) {
      const { email, firstName, lastName } = payload;
      Segment.identify({ email, firstName, lastName });
    } else {
      Segment.reset();
    }
  }

  /**
   * Listenes to route focuses and sends statistics back to Segment.io
   */
  setupRouteChangeListener() {
    const {navigator: {navigationContext}} = this.refs.navigator;

    navigationContext.addListener('didfocus', ({ data }) => {
      Segment.trackEvent('pageVisit', {
        page: data.route.name
      });
    });
  }

  setupQuickActions() {
    const {
      msg: {app: {shortcuts: msg}},
      isLoggedIn,
      venues: {activeVenue}
    } = this.props;

    // Clear all items for anonymous users
    if (!isLoggedIn) {
      return QuickActionsIOS.clearShortcutItems();
    }
    //@todo bring back order for 3D Touch menu
    if (activeVenue) {
      QuickActionsIOS.setShortcutItems([
        {
          type: msg.orders.type,
          title: msg.orders.title,
          subtitle: msg.orders.subtitle,
          icon: 'shortcut-orders',
          userInfo: {
            url: 'pfc-mobile://orders'
          }
        }
      ]);
    } else {
      QuickActionsIOS.setShortcutItems([
        {
          type: msg.venues.type,
          subtitle: msg.venues.subtitle,
          icon: 'shortcut-venues',
          userInfo: {
            url: 'pfc-mobile://venues'
          }
        }
      ]);
    }
  }

  /*
   * Returns false if in-app URL would've redirected to
   * the page we are currently on
   *
   * Special case for `orders` link to not take users away from orderProcess
   * and other order-related screens
   */
  shouldHandleOpenURL(url) {
    const {name} = this.getCurrentRoute();

    if (url === 'pfc-mobile://orders') {
      return name.indexOf('order') === -1;
    }

    return url.indexOf(name) === -1;
  }

  getCurrentRoute() {
    return this.refs.navigator.getCurrentRoute();
  }

  /*
   * Handles in app URLs
   * If user tries to go to a link that is only accessible when he is either
   * logged in or logged out and the state does not match,
   * no action is taken because log out url is asynchronous
   */
  handleOpenURL({url}) {
    const {navigator} = this.refs;

    if (!this.shouldHandleOpenURL(url)) return;

    // Handling logged-in in-app links
    if (this.props.isLoggedIn) {

      if (url.indexOf('orders') > -1) {
        return navigator.transitionToTop('orders');
      }

      if (url.indexOf('venues') > -1) {
        return navigator.transitionToTop('venues');
      }

    // Logged out in-app links
    } else {

      if (url.indexOf('reset-password') > -1) {
        const resetPasswordToken = url.split('?token=')[1];

        if (!resetPasswordToken) return;

        return navigator.transitionTo('newPasswordCheck', {
          resetPasswordToken
        });
      }

      if (url.indexOf('login') > -1) {
        return navigator.transitionTo('login');
      }

      if (url.indexOf('register') > -1) {
        return navigator.transitionTo('register');
      }

    }
  }

  getToken() {
    return this.props.isLoggedIn && this.props.user.profile.token;
  }

  createActions() {
    const {flux} = this.props;
    const api = makeApi(this.getToken.bind(this), this.props.msg.api);

    this.actions = registerActions.reduce((registerActions, {feature, actions, create, deps = []}) => {
      const dispatch = (action, payload) => flux.dispatch(action, payload, {feature});
      const featureActions = create(dispatch, api, ...deps);
      setToString(feature, actions);
      return {...registerActions, [feature]: featureActions};
    }, {});

    this.throttleUpdatePosition = throttle(this.actions.app.updatePosition, 30000);
  }

  /*
   * If user is not logged in,
   * this method makes sure the login screen
   * is exposed to the user
   */
  maybeShowLoginPage() {
    const {navigator} = this.refs;
    const welcomeRoute = navigator.getRoute('welcome');

    if (!this.props.isLoggedIn) {
      const topMostRoute = navigator.getTopMostRoute();

      // If welcome is already in the stack
      // go to it straight away
      // otherwise, replace at 0 and popToTop
      if (topMostRoute.component === welcomeRoute.component) {
        navigator.popToTop();
      } else {
        navigator.replaceAtIndex(welcomeRoute, 0);
        navigator.popToTop();
      }
    }
  }

  /**
   * Gets initial route
   *
   * @description
   * If user is not logged in, redirect to welcome
   * screen. If payment data has not been provided,
   * redirect to enterPayment screen
   *
   * @returns {Object} route - route for desired page
   */
  getInitialRouteStack() {
    const {user: {profile: user}} = this.props;

    let routeStack = [];

    if (!this.props.isLoggedIn) {
      routeStack.push('welcome');
    } else if (!user.hasPaymentData()) {
      routeStack.push('enterPayment');
    } else {
      routeStack.push('venues');
    }

    return routeStack;
  }

  maybeCloseMenu(willOpen) {
    const {
      app: {toggleMenu}
    } = this.actions;

    if (!willOpen && this.props.app.isMenuOpened) {
      toggleMenu();
    }
  }

  /**
   * Handle item selection
   *
   * @description This action is fired every time user presses the left menu button
   *
   * @param {string} itemKey - key of the selected tiem
   */
  onItemSelected(itemKey) {
    const {navigator} = this.refs;
    const route = navigator.getRoute(itemKey);

    if (route) {
      navigator.replace(route);

      setTimeout(_ => {
        this.actions.app.toggleMenu();
      }, 100);
    }
  }

  // Show location error page only if
  // its not being currently presented
  maybeShowLocationError(err) {
    const {navigator} = this.refs;
    const topMostRoute = navigator.getCurrentRoute();

    // Handle different errors
    switch (err.code) {

      // RCTPositionErrorDenied
      case 1: {
        if (topMostRoute.name !== 'locationError') {
          InteractionManager.runAfterInteractions(_ => {
            navigator.transitionTo('locationError');
          });
        }
        break;
      }

      // RCTPositionErrorUnavailable
      // RCTPositionErrorTimeout
      default:
        // @todo Figure out how to handle
        break;
    }


  }

  // Dismiss error if it's present
  // and update location
  updateLocation(location) {
    const {navigator} = this.refs;
    const topMostRoute = navigator.getCurrentRoute();

    // If there was an error, dispatch update immediatelly
    // Otherwise put into queue
    if (topMostRoute.name === 'locationError') {
      this.actions.app.updatePosition(location);
      navigator.pop();
    } else {
      this.throttleUpdatePosition(location);
    }
  }

  /**
   * Main application structure
   *
   * @description
   * Renders
   * - SideMenu containing left <Menu /> instance
   * - NavigatorIOS that renders <Champagnes /> instance by default
   * - TouchableHighlight that makes the hamburger icon clickable
   *
   * @returns {Function} renders application UI
   */
  render() {
    const {
      venues: venueActions,
      user: userActions,
      app: appActions
    } = this.actions;

    const {
      msg: {menu: msg, basketBar: basketMsg},
      app: {isMenuOpened, isBasketVisible},
      venues: {activeVenue},
      orders: {activeOrdersCount},
      basket: {items: basket, totalItems: totalBasketItems, totalPrice: totalBasketPrice},
      user
    } = this.props;

    const initialRouteStack = this.getInitialRouteStack();

    const animationStyle = value => {
      return {
        transform: [{
          scale: value.interpolate({
            inputRange: [0, 100],
            outputRange: [1, 0.95]
          })
        }],
        left: value
      };
    };

    const animationFunction = (prop, value) => {
      return Animated.spring(prop, {
        toValue: value,
        friction: 8,
        tension: 50
      });
    };

    const menu = (
      <Menu
        activeOrdersCount={activeOrdersCount}
        basketCount={totalBasketItems}
        msg={msg}
        onItemSelected={this.onItemSelected.bind(this)}
        venue={activeVenue}
      />
    );

    return (
      <View style={{flex: 1}}>
        <StatusBar
          barStyle={this.props.app.statusBarStyle}
          hidden={this.props.app.isStatusBarHidden}
        />
        <SideMenu
          animationFunction={animationFunction}
          animationStyle={animationStyle}
          disableGestures
          isOpen={isMenuOpened}
          menu={menu}
          onChange={this.maybeCloseMenu.bind(this)}
          ref='menu'
          style={appStyle.container}>
          <View style={appStyle.container}>
            <Navigator
              initialRouteStack={initialRouteStack}
              passProps={{...this.props, actions: this.actions}}
              ref='navigator'
              routes={routes}
              style={[appStyle.container, basket.size > 0 && isBasketVisible && appStyle.containerWithBar]}
            />
            <BasketBar
              basketCount={totalBasketItems}
              basketPrice={totalBasketPrice}
              isVisible={basket.size > 0 && isBasketVisible}
              msg={basketMsg}
              onPress={() => {
                appActions.hideBasketBar();
                this.refs.navigator.transitionTo('basket');
              }}
            />
          </View>
        </SideMenu>

        <Beacons
          activeVenue={activeVenue}
          onBeaconDiscovered={venueActions.setLocationFromBeacon}
          onBeaconLost={venueActions.removeLocationFromBeacon}
          onLocationError={this.maybeShowLocationError.bind(this)}
          onLocationRequested={userActions.registerForLocationUpdates}
          onLocationUpdated={this.updateLocation.bind(this)}
          user={user}
        />

        <Notifications
          onSessionRegistered={userActions.registerRemoteSession}
          onSessionRequested={userActions.registerForRemoteNotifications}
          user={user}
        />
      </View>
    );

  }

}

export default flux(App, store);
