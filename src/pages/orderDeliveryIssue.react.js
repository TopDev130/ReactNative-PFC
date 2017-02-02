import React, {View, Text, ScrollView, AlertIOS} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import Header from '../components/header.react';
import ProgressHUD from '@moonjs/react-native-progresshud';
import Button from '../components/button.react';
import * as appStyle from '../app/app.style';
import style from './orderProblem.style';

class OrderDeliveryIssue extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired,
    orders: React.PropTypes.object.isRequired
  };

  reportDeliveryIssue() {
    const {
      actions: {order: actions},
      orders: {currentOrder: order},
      msg: {orderDeliveryIssue: {modal: msg}},
      navigation
    } = this.props;

    actions.reportDeliveryIssue(order)
      .then(_ => {
        AlertIOS.alert(msg.successTitle, msg.successDescription, [
          {text: msg.button.ok, onPress: _ => navigation.popBack(2)}
        ]);
      })
      .catch(err => {
        AlertIOS.alert(msg.errorTitle, err.global || err.message, [
          {text: msg.button.ok}
        ]);
      });
  }

  render() {
    const {
      msg: {orderDeliveryIssue: msg},
      orders: {isDeliveryIssuePending},
      navigation
    } = this.props;

    return (
      <View style={style.container}>

        <Header
          onBackIconClick={navigation.pop}
          title={msg.title}
          withBorder
        />

        <ScrollView
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={{flex: 1, paddingTop: 30}}>

          <Header
            style={style.heading}
            title={msg.subTitle}
            type='big'
          />

          <Text style={[appStyle.text, style.text]}>{msg.intro}</Text>

          <View style={[appStyle.stickToBottom, {padding: 18}]}>

            <Button
              className='primary'
              onPress={() => this.reportDeliveryIssue()}
              style={{marginBottom: 0}}
              title={msg.actionButton}
            />

          </View>

        </ScrollView>

        <ProgressHUD isVisible={isDeliveryIssuePending} />

      </View>
    );
  }

}

export default pureRender(OrderDeliveryIssue, ['app']);
