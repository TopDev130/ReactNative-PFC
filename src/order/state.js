import {Record} from 'immutable';
import {createSelector} from 'reselect';

const StateRecord = Record({
  list: null,
  isPending: false,
  activeOrder: null,
  currentOrder: -1,
  isDeliveryIssuePending: false,
  isRefundPending: false,
  isCancelPending: false,
  error: null
});

const selectActiveOrders = createSelector(
  state => state.list,
  list => list
    ? list.reduce((acc, order) => order.isNew() || order.isProcessing() ? acc + 1 : acc, 0)
    : 0
);

export default class OrderState extends StateRecord {

  get currentOrder() {
    return this.get('currentOrder') > -1
      ? this.getIn(['list', this.get('currentOrder')])
      : null;
  }

  get activeOrdersCount() {
    return selectActiveOrders(this);
  }

}
