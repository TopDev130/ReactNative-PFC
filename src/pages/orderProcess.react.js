import React, {Text, ActionSheetIOS, AlertIOS, View} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import ActivityView from 'react-native-activity-view';
import ProgressHUD from '@moonjs/react-native-progresshud';
import styles from './orderProcess.style';
import {format} from '../intl/store';
import OrderIndicators from '../order/process/indicators.react';
import * as OrderView from '../order/process';
import {trackEvent} from 'Analytics';
import {activityView as config, notifications as notificationsConfig} from '../config';

class OrderProcess extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    fromBasket: React.PropTypes.bool,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired,
    orders: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired
  };

  /**
   * Asks for update every 5 seconds
   * @todo handle errors more gracefuly
   */
  componentDidMount() {
    const {
      orders: {activeOrder: currentOrder},
      actions: {
        app: {changeStatusBarStyle},
        order: {getActiveOrderStatus}
      }
    } = this.props;

    changeStatusBarStyle('light-content');

    this.interval = setInterval(_ => {
      getActiveOrderStatus(currentOrder);
    }, 5 * 1000);
  }

  /**
   * Stop subscription when this view disappears
   */
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  // Closes this page
  // That's the only way to get out since
  // gestures are disabled
  goBack() {
    this.props.actions.app.changeStatusBarStyle();
    this.props.actions.order.maybeSaveActiveOrder();

    // basket can be called from any place, always transition to top
    const backSteps = this.props.fromBasket
      ? this.props.navigation.getCurrentRoutes().length - 1
      : 1;

    this.props.navigation.popBack(
      backSteps
    );
  }

  shareOrder() {
    const {
      msg: {orderProcess: {shareView: msg}},
      orders: {activeOrder: order}
    } = this.props;

    trackEvent('Shared order');

    ActivityView.show({
      text: format(msg.title, {
        venue: order.venue.title
      }),
      exclude: config.excludedActivities
    });
  }

  cancelOrder() {
    const {
      actions: {order: actions},
      orders: {activeOrder: order},
      msg: {orderProcess: {cancelError: msg}}
    } = this.props;

    actions.cancelOrder(order)
      .then(() => trackEvent('Canceled order'))
      .catch(err => {
        AlertIOS.alert(msg.title, err.global || msg.description);
      });
  }

  maybeCancelOrder() {
    const {
      msg: {orderProcess: {cancelPopup: msg}}
    } = this.props;

    ActionSheetIOS.showActionSheetWithOptions({
      options: [msg.accept, msg.cancel],
      cancelButtonIndex: 1,
      destructiveButtonIndex: 0,
      title: msg.title
    }, index => {
      if (index === 0) this.cancelOrder();
    });
  }

  registerForNotifications() {
    const {permissions} = notificationsConfig;

    this.props.actions.user.registerForRemoteNotifications(permissions);
  }

  render() {
    const {
      orders: {activeOrder: order, isCancelPending},
      msg: {orderProcess: msg},
      user
    } = this.props;

    const ViewToRender = OrderView[order.status];

    const msgKey = order.isCollection() ? `${order.status}Collection` : order.status;

    return (
      <View style={styles.container}>

        <ViewToRender
          msg={msg[msgKey]}
          onCloseButtonClick={this.goBack.bind(this)}
          onNotificationsClick={this.registerForNotifications.bind(this)}
          onShareButtonClick={this.shareOrder.bind(this)}
          order={order}
          user={user}
          venue={order.venue}
        />

        {!order.isRejected() && !order.isCancelled() && (
          <OrderIndicators
            activePage={order.isFinished() ? 3 : order.isProcessing() ? 2 : 1}
            style={styles.indicators}
            totalPages={3}
          />
        )}

        {order.isNew() && (
          <Text
            onPress={() => this.maybeCancelOrder()}
            style={styles.cancelButton}>
            {msg.button.cancel.toUpperCase()}
          </Text>
        )}

        {!order.isRejected() && !order.isCancelled() && (
          <Text
            onPress={() => this.goBack()}
            style={styles.closeButton}>
            {msg.button.close.toUpperCase()}
          </Text>
        )}

        <ProgressHUD isVisible={isCancelPending} />

      </View>
    );
  }

}

export default pureRender(OrderProcess, ['app']);
