import React, {Text, View} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import styles from './orderProcess.style';
import {orderError as ErrorView} from '../order/process';

class OrderProcessError extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    errorType: React.PropTypes.string.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actions.app.changeStatusBarStyle('light-content');
  }

  handleCloseClick() {
    const {
      navigation,
      errorType,
      actions: {app: actions}
    } = this.props;

    actions.changeStatusBarStyle();

    switch (errorType) {
      case 'expiredCard':
      case 'cardDeclined':
        return navigation.transitionToTop('profile');
      default:
        return navigation.transitionToTop('help');
    }
  }

  goBack() {
    const {
      navigation,
      actions: {app: actions}
    } = this.props;

    navigation.pop();
    actions.showBasketBar();
    actions.changeStatusBarStyle();
  }

  render() {
    const {
      msg: {orderProcessError: msg},
      errorType
    } = this.props;

    const errorMsg = msg[errorType] || msg.general;

    return (
      <View style={styles.container}>

        <ErrorView
          msg={errorMsg}
          onCloseButtonClick={() => this.handleCloseClick()}
        />

        <Text
          onPress={() => this.goBack()}
          style={styles.cancelButton}>
          {msg.button.close.toUpperCase()}
        </Text>

      </View>
    );
  }

}

export default pureRender(OrderProcessError, ['app']);
