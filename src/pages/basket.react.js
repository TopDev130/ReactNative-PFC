import React, {ScrollView, AlertIOS, InteractionManager, View} from 'react-native';
import Immutable from 'immutable';
import pureRender from '@moonjs/react-native-purerender';
import Header from '../components/header.react';
import ProgressHUD from '@moonjs/react-native-progresshud';
import SectionHeader from '../components/sectionHeader.react';
import BasketItem from '../basket/item.react';
import Button from '../components/button.react';
import {trackEvent} from 'Analytics';
import DeliveryOption from '../basket/deliveryOption.react';
import BasketSummary from '../basket/summary.react';
import {format} from '../intl/store';
import style from './basket.style';

const TABLE_DELIVERY = 1;
const COLLECTION_DELIVERY = 0;
const SEARCHING_TIMEOUT = 5000;

class Basket extends React.Component {

  state = {
    currentItem: -1,
    currentDeliveryOption: COLLECTION_DELIVERY,

    // @todo this will land in venue object soon from API
    deliveryOptions: Immutable.fromJS([{
      type: COLLECTION_DELIVERY,
      msg: {
        title: 'Collection'
      }
    }, {
      type: TABLE_DELIVERY,
      msg: {
        title: 'Delivered to me',
        pending: 'Searching...',
        empty: 'No delivery location nearby',
        error: 'No bluetooth permissions'
      },
      hasError: false,
      isPending: true,
      value: null
    }])
  };

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    basket: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired,
    venues: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actions.app.changeStatusBarStyle('light-content');
    this.checkForLocationInVenue(this.props, true);
  }

  /*
   * Will be called when basket updates
   *
   * If there's new locationInVenue we know - automatically select `delivery`
   *
   * Otherwise - start `searching` if we just lost the beacon (which means
   * we will automatically unselect it for user)
   */
  componentWillReceiveProps(nextProps) {
    const {venues: {locationInVenue}} = nextProps;

    if (locationInVenue === this.props.venues.locationInVenue) {
      return;
    }

    this.checkForLocationInVenue(nextProps);
  }

  /**
   * Clear timeout
   */
  componentWillUmnout() {
    clearTimeout(this.searchTimeout);
  }

  checkForLocationInVenue(props = this.props, overwrite = false) {
    const {venues: {locationInVenue}} = props;

    if (locationInVenue) {
      this.hideSearchingMessage();
      this.setState({
        currentDeliveryOption: overwrite ? TABLE_DELIVERY : this.state.currentDeliveryOption,
        deliveryOptions: this.state.deliveryOptions.setIn([1, 'value'], locationInVenue)
      });
    } else {
      this.showSearchingMessage();
    }
  }

  /**
   * Starts showing a `Searching...` message and resets delivery
   * to COLLECTION_DELIVERY
   */
  showSearchingMessage = () => {
    clearTimeout(this.searchTimeout);

    this.setState({
      deliveryOptions: this.state.deliveryOptions.update(1,
        item => item
          .set('isPending', true)
          .set('value', null)
      ),
      currentDeliveryOption: COLLECTION_DELIVERY
    });

    this.searchTimeout = setTimeout(this.hideSearchingMessage, SEARCHING_TIMEOUT);
  };

  /**
   * Hides `Searching...` message
   */
  hideSearchingMessage = () => {
    clearTimeout(this.searchTimeout);

    this.setState({
      deliveryOptions: this.state.deliveryOptions.setIn([1, 'isPending'], false)
    });
  };

  /*
   * Helper to get current delivery
   */
  getCurrentDeliveryOption() {
    return this.state.deliveryOptions.get(this.state.currentDeliveryOption);
  }

  /*
   * Returns true if selected delivery is correct. Currently, `undefined` value
   * means user did select `collection` and `non null` means it's delivery.
   *
   * Soon, we will change that on the API side.
   */
  hasValidDelivery() {
    return this.getCurrentDeliveryOption().get('value') !== null;
  }

  goBack() {
    this.props.actions.app.changeStatusBarStyle();
    this.props.actions.app.showBasketBar();
    this.props.navigation.pop();
  }

  onItemSelected(index) {
    this.setState({
      currentItem: index
    });
  }

  trackOrder(action, item) {
    trackEvent(action, {
      product: item.product.title,
      productId: item.product._id,
      option: item.option.kind,
      optionId: item.option._id
    });
  }

  submitOrder() {
    const {
      basket: {items: products},
      venues: {currentVenue: venue},
      navigation
    } = this.props;

    this.props.actions.order
      .createOrder({
        products,
        venue,
        location: this.getCurrentDeliveryOption().get('value')
      })
      .then(payload => {
        trackEvent('Placed order', {
          orderId: payload.orderId,
          _id: payload._id,
          totalValue: payload.amount.total,
          venue: payload.venue.title
        });

        navigation.transitionTo('orderProcess', {
          fromBasket: true
        });

        InteractionManager.runAfterInteractions(() => {
          this.props.actions.app.showBasketBar();
        });

        return null;
      })
      .catch(err => {
        if (!err.reason) {
          return AlertIOS.alert('Error', err.global);
        }

        InteractionManager.runAfterInteractions(_ => {
          navigation.transitionTo('orderProcessError', {
            errorType: err.reason
          });
        });
      });
  }

  addItemToBasket(item) {
    this.trackOrder('Added to basket', item);
    this.props.actions.basket.addToBasket(item.option, item.product);
  }

  removeItemFromBasket(item) {
    this.trackOrder('Removed from basket', item);
    this.props.actions.basket.removeFromBasket(item.option);
  }

  /*
   * Renders delivery option. User should provide isTableDelivery bool in message object
   * containing delivery option. When isTableDelivery is set to true, user can user pending
   * prop.
   */
  renderDeliveryOption = (item, key) => {
    const onSelected = () => {
      if (item.get('type') !== TABLE_DELIVERY || item.get('value')) {
        this.setState({
          currentDeliveryOption: item.get('type')
        });
      }
    };

    return (
      <DeliveryOption
        error={null}
        isSelected={this.state.currentDeliveryOption === item.get('type')}
        key={key}
        msg={item.get('msg').toJS()}
        onSelected={onSelected}
        pending={item.get('isPending')}
        value={item.get('value')}
      />
    );
  };

  render() {
    const {
      msg: {basket: msg},
      venues: {currentVenue: {processingFee}},
      basket: {totalItems, isPending, totalPrice, groupedItems, items}
    } = this.props;

    return (
      <View style={style.container}>
        <Header
          onBackIconClick={this.goBack.bind(this)}
          title={msg.title}
          type='navbar-dark'
          withBorder
        />

        <ScrollView style={{flex: 1}}>

          <SectionHeader
            dark
            title={format(msg.items, {quantity: totalItems})}
            withBorder
          />

          {items.map((basketItem, key) =>
            <BasketItem
              displayOptionKind={groupedItems.get(basketItem.product._id).size > 1}
              isSelected={this.state.currentItem === key}
              item={basketItem}
              key={key}
              onAddItemPress={this.addItemToBasket.bind(this, basketItem)}
              onRemoveItemPress={this.removeItemFromBasket.bind(this, basketItem)}
              onSelected={this.onItemSelected.bind(this, key)}
            />
          )}

          <SectionHeader title={msg.delivery} withBorder />

          {this.state.deliveryOptions.map(this.renderDeliveryOption)}

          <SectionHeader title={msg.summary} withBorder />

          <BasketSummary
            msg={msg.summaryBox}
            processingFee={processingFee}
            totalPrice={totalPrice}
          />
        </ScrollView>

        <Button
          className='primary'
          disabled={items.size === 0 || !this.hasValidDelivery() || isPending}
          onPress={this.submitOrder.bind(this)}
          style={{marginBottom: 0}}
          title={msg.submitOrder}
        />

        <ProgressHUD isVisible={isPending} />
      </View>
    );
  }

}

export default pureRender(Basket, ['app']);
