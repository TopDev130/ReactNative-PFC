import React, {LayoutAnimation, InteractionManager, View, Text} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import ProgressHUD from '@moonjs/react-native-progresshud';
import {animations} from '../decorators/animation';
import Header from '../components/header.react';
import CategoryList from '../products/categoryList.react';
import ListError from '../components/listError.react';
import WelcomeBar from '../components/welcomeBar.react';

import style from './orders.style';

class Categories extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    app: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired,
    products: React.PropTypes.object.isRequired,
    venues: React.PropTypes.object.isRequired
  };

  componentWillMount() {
    this.props.actions.app.showBasketBar();
  }

  componentDidMount() {
    const {
      actions: {venues},
      products: {list},
      venues: {activeVenue: venue, isNewToVenue}
    } = this.props;

    if (!list) {
      this.loadMenu().then(() => {
        LayoutAnimation.configureNext(animations.layout.spring);
      });
    }

    if (venue.hasBeacons() && !venue.hasBeaconsLoaded()) {
      venues.getVenueBeacons(venue);
    }

    if (isNewToVenue) {
      InteractionManager.runAfterInteractions(this.handleWelcomeBar);
    }

    this.checkInterval = setInterval(this.loadMenu.bind(this), 60000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.venues.isNewToVenue && !this.props.venues.isNewToVenue) {
      this.props.actions.app.changeStatusBarStyle();
    }
  }

  componentWillUnmount() {
    this.props.actions.app.hideBasketBar();
    clearInterval(this.checkInterval);
  }

  /**
   * When user selects category super fast, React will not update this component
   * but go to the next page. On back, props are updated but pureRender will
   * not reload our component since `isNewToVenue` in fact didnt' change.
   *
   * When we gain focus, we simply check if welcomeBar should be hidden
   * and do so programatically.
   */
  handleWelcomeBar = () => {
    if (this.props.venues.isNewToVenue) {
      this.props.actions.app.changeStatusBarStyle('light-content');
    } else if (this.refs.welcomeBar.isVisible()) {
      this.props.actions.app.changeStatusBarStyle();
      this.refs.welcomeBar.hide();
    }
  };

  loadMenu = () => {
    const {
      actions: {products: actions},
      venues: {activeVenue: venue}
    } = this.props;

    return actions.getProducts(venue);
  };

  // See `this.handleWelcomeBar` to get an idea of `onPop` use here
  onCategorySelected(category) {
    this.props.actions.products.selectProductCategory(category);
    this.props.actions.app.changeStatusBarStyle();
    this.props.navigation.transitionTo('products', { onPop: this.handleWelcomeBar });
  }

  render() {
    const {
      actions: {app: {toggleMenu}, venues: {hideWelcomeBar}},
      products: {list: categories, isPending, error},
      venues: {activeVenue: venue, isNewToVenue},
      msg: {categories: msg}
    } = this.props;

    return (
      <View style={style.container}>

        <Header
          onMenuIconClick={toggleMenu}
          title={msg.title}
          withBorder
        />

        <WelcomeBar
          isVisible={isNewToVenue}
          msg={msg.welcomeBar}
          onDismiss={hideWelcomeBar}
          ref='welcomeBar'
          title={venue.title}
        />

        {categories && categories.size > 0 && (
          <CategoryList
            activeVenue={venue}
            items={categories}
            onRefresh={this.loadMenu}
            onSelected={this.onCategorySelected.bind(this)}
          />
        )}

        {categories && categories.size === 0 && (
          <View style={style.emptyList}>
            <Text style={style.emptyListText}>
              {msg.noCategories.toUpperCase()}
            </Text>
          </View>
        )}

        {error && error.global && (
          <ListError
            onReload={this.loadMenu.bind(this)}
          />
        )}

        <ProgressHUD isVisible={isPending} />

      </View>
    );
  }
}

export default pureRender(Categories, ['app']);
