import React, {ScrollView, View, Text, Image} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import Header from '../components/header.react';
import * as appStyle from '../app/app.style';
import style from './orderProblem.style';
import * as Row from '../components/row.react';
import * as Analytics from 'Analytics';

class OrderProblem extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired,
    orders: React.PropTypes.object.isRequired
  };

  deliveryProblem() {
    this.props.navigation.transitionTo('orderDeliveryIssue');
  }

  somethingElse() {
    Analytics.showMessagesList();
  }

  renderRow(rowTitle, onSelected) {
    return (
      <Row.Container onSelected={onSelected}>
        <Row.LeftColumn>
          <Text type='rowSubtext'>{rowTitle}</Text>
        </Row.LeftColumn>
        <Row.RightColumn>
          <Image source={require('../../assets/images/lightgrey_next_arrow.png')}/>
        </Row.RightColumn>
      </Row.Container>
    );
  }

  render() {
    const {
      msg: {orderProblem: msg},
      navigation
    } = this.props;

    return (
      <View style={style.container}>

        <Header
          onBackIconClick={navigation.pop}
          title={msg.title}
          withBorder
        />

        <ScrollView>

          <Header
            style={style.heading}
            title={msg.subTitle}
            type='big'
          />

          <Text style={[appStyle.text, style.text]}>{msg.intro}</Text>

          <View style={style.options}>
            {this.renderRow(msg.options.deliveryProblem, this.deliveryProblem.bind(this))}
            {this.renderRow(msg.options.somethingElse, this.somethingElse.bind(this))}
          </View>

        </ScrollView>

      </View>
    );
  }

}

export default pureRender(OrderProblem, ['app']);
