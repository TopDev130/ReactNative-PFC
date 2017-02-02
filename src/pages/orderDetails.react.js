import React, {ScrollView, View, Text} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import Header from '../components/header.react';
import Button from '../components/button.react';
import {format, currency} from '../intl/store';
import style from './orderDetails.style';
import {grid, h1, h2} from '../app/app.style';
import * as Row from '../components/row.react';

class OrderDetails extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired,
    orders: React.PropTypes.object.isRequired
  };

  expandOrder() {
    const {
      actions: {order: actions},
      orders: {currentOrder: order},
      navigation
    } = this.props;

    actions.setActiveOrder(order);

    setTimeout(_ => {
      navigation.transitionTo('orderProcess');
    });
  }

  goToContactPage() {
    this.props.navigation.transitionTo('orderProblem');
  }

  renderQuantity(qty, str) {
    return qty > 1 ? `${qty}x ${str}` : str;
  }

  renderBasketItem = (item, key) => {
    const {quantity, product, price, option} = item;

    const selectedOption = product.options.findEntry(i => i._id === option)[1];

    const quantityView = product.options.size > 1
      ? (
        <View>
          <Text style={style.summaryText}>{product.title}</Text>
          <Text style={style.summaryTextGray}>{this.renderQuantity(quantity, selectedOption.kind)}</Text>
        </View>
      )
      : (
        <View>
          <Text style={style.summaryText}>{this.renderQuantity(quantity, product.title)}</Text>
        </View>
      );

    return (
      <Row.Container containerStyle={style.basketItem} key={key} style={{borderBottomWidth: 0}} type=''>
        {quantityView}
        <Row.RightColumn>
          <Text style={style.summaryTextGray}>{currency(price)}</Text>
        </Row.RightColumn>
      </Row.Container>
    );
  };

  render() {
    const {
      navigation,
      orders: {currentOrder: order},
      msg: {orderDetails: msg}
    } = this.props;
    const {card, venue, amount, basket} = order;

    const isPastOrder = order.isFinished()
      || order.isCancelled()
      || order.isRejected();

    const orderType = msg.status[order.status];

    return (
      <View style={style.container}>

        <Header
          onBackIconClick={navigation.pop}
          onRightIconClick={this.expandOrder.bind(this)}
          rightIconSource={require('../../assets/images/Expand-order.png')}
          title={msg.title}
          withBorder
        />

        <ScrollView>

          <Text style={style.orderHeader}>
            {format(msg.header, order).toUpperCase()}
          </Text>

          {orderType && (
            <Text style={isPastOrder ? style.rowStatusPast : style.rowStatus}>
              {orderType.toUpperCase()}
            </Text>
          )}

          <View style={style.venueBox}>
            <Text style={h1}>{venue.title}</Text>
            <Text style={h2}>{order.date}</Text>
          </View>

          {!isPastOrder &&
            [
              <Text key="header" style={style.orderHeader}>
                {format(msg.password, order).toUpperCase()}
              </Text>,
              <Text key="password" style={style.password}>
                {order.password}
              </Text>
            ]
          }

          <Text style={style.orderHeader}>
            {msg.title.toUpperCase()}
          </Text>

          <View style={style.summaryBox}>

            {basket.map(this.renderBasketItem)}

            {order.amount.stripeFee > 0 && (
              <View style={[grid.row, {marginBottom: 10}]}>
                <Text style={style.summaryText}>
                  {msg.processingFee}
                </Text>
                <Text style={style.summaryTextGray}>
                  {currency(Math.floor(amount.stripeFee))}
                </Text>
              </View>
            )}

            <View style={[grid.row]}>
              <Text style={style.summaryTextBold}>
                {msg.total}
              </Text>
              <Text style={style.summaryTextGray}>
                {currency(amount.total)}
              </Text>
            </View>
          </View>

          <Text style={style.orderHeader}>
            {format(msg.cardNumber, card)}
          </Text>

          <Button
            className='secondary'
            onPress={() => this.goToContactPage()}
            style={style.reportProblemButton}
            title={msg.button.reportProblem}
          />

        </ScrollView>

      </View>
    );
  }

}

export default pureRender(OrderDetails, ['app']);
