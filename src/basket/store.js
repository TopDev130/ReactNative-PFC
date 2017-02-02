import {actions} from './actions';
import {actions as orderActions} from '../order/actions';
import {actions as venueActions} from '../venues/actions';
import BasketItem from './item';
import {List} from 'immutable';
import BasketState from './state';

const initialState = new BasketState();

const revive = state => {
  const items = state.get('items');
  return initialState.merge({
    items: items ? items.map(c => new BasketItem(c)) : List([])
  });
};

export default function basketStore(state = initialState, action, payload) {
  if (!action) return revive(state);

  switch (action) {

    case actions.addToBasket: {
      const {product, option} = payload;
      const index = state.items.findIndex(item => item.option._id === option._id);
      return index === -1
        ? state.update('items', list => list.push(
            new BasketItem({product, option, quantity: 1})
          ))
        : state.updateIn(['items', index, 'quantity'], quantity => quantity + 1);
    }

    case actions.removeFromBasket: {
      const {option} = payload;
      const index = state.items.findIndex(item => item.option._id === option._id);

      if (index === -1) return state;

      const currentQuantity = state.items.getIn([index, 'quantity']);

      if (currentQuantity === 1) {
        return state.deleteIn(['items', index]);
      }

      return state.updateIn(['items', index, 'quantity'], quantity => quantity - 1);
    }

    case orderActions.createOrder:
      return state.set('isPending', true);

    case orderActions.createOrderError:
      return state.remove('isPending');

    case orderActions.createOrderSuccess:
      return state
        .remove('isPending')
        .remove('items');

    case venueActions.chooseVenue:
      return initialState;

  }

  return state;
}
