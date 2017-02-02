import {Record, List} from 'immutable';
import {createSelector} from 'reselect';

const StateRecord = Record({
  items: List(),
  isPending: false,
  error: null
});

const selectGroupedItems = createSelector(
  state => state.items,
  items => items
    .groupBy(item => item.product._id)
    .map(items => items.toMap().mapEntries(([_, item]) => [item.option._id, item.quantity]))
  );

const selectTotalItems = createSelector(
  state => state.items,
  items => items.reduce((acc, item) => acc + item.quantity, 0)
);

const selectTotalPrice = createSelector(
  state => state.items,
  items => items.reduce((acc, item) => acc + item.quantity * item.option.price, 0)
);

export default class BasketState extends StateRecord {

  get groupedItems() {
    return selectGroupedItems(this);
  }

  get totalItems() {
    return selectTotalItems(this);
  }

  get totalPrice() {
    return selectTotalPrice(this);
  }

}
