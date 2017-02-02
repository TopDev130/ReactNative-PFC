import React, {View, Text, LayoutAnimation} from 'react-native';
import ProgressHUD from '@moonjs/react-native-progresshud';
import pureRender from '@moonjs/react-native-purerender';
import {animations} from '../decorators/animation';
import style from './orders.style';
import OrdersList from '../order/list.react';
import ListError from '../components/listError.react';
import Header from '../components/header.react';

class OrderPage extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired,
    orders: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    const orders = this.props.orders.get('list');

    if (!orders) {
      this.loadOrders().then(() => {
        LayoutAnimation.configureNext(animations.layout.spring);
      });
    }
  }

  loadOrders = () => {
    return this.props.actions.order.getOrders();
  };

  onOrderSelected(order) {
    this.props.actions.order.openOrderDetails(order);
    this.props.navigation.transitionTo('orderDetails');
  }

  // Renders orders list
  render() {
    const {
      actions: {app: {toggleMenu}},
      orders: {list, isPending, error},
      msg: {orders: msg}
    } = this.props;

    return (
      <View style={style.container}>

        <Header
          onMenuIconClick={toggleMenu}
          title={msg.title}
          withBorder
        />

        {list && list.size > 0 && (
          <OrdersList
            items={list}
            msg={msg.list}
            onRefresh={this.loadOrders}
            onSelected={order => this.onOrderSelected(order)}
          />
        )}

        {list && list.size === 0 && (
          <View style={style.emptyList}>
            <Text style={style.emptyListText}>
              {msg.noOrders.toUpperCase()}
            </Text>
          </View>
        )}

        {error && error.global && (
          <ListError onReload={() => this.loadOrders()} />
        )}

        <ProgressHUD isVisible={isPending} />

      </View>
    );
  }

}

export default pureRender(OrderPage, ['app']);
