import {actions} from './actions';
import {actions as authActions} from '../auth/actions';
import Order from './order';
import {List, fromJS} from 'immutable';
import OrderState from './state';

const initialState = new OrderState();

const revive = state => {
  const items = state.get('list');
  const activeOrder = state.get('activeOrder');
  const currentOrder = state.get('currentOrder') || -1;
  return initialState.merge({
    activeOrder: activeOrder ? new Order(activeOrder) : null,
    list: items ? items.map(order => new Order(order)) : null,
    currentOrder
  });
};

export default function orderStore(state = initialState, action, payload) {
  if (!action) return revive(state);

  switch (action) {

    case actions.getOrders:
      return state
        .remove('error')
        .remove('currentOrder')
        .set('isPending', !state.list || state.list.items === 0);

    case actions.getOrdersError:
      return state
        .set('error', payload)
        .remove('list')
        .remove('isPending');

    case actions.getOrdersSuccess:
      return state
        .remove('isPending')
        .set('list', List(payload.map(order => new Order(order))));

    case actions.setActiveOrder:
      return state.set('activeOrder', payload);

    case authActions.logoutSuccess:
      return state
        .set('activeOrder', null)
        .set('list', null);

    case actions.createOrderSuccess: {
      const order = new Order(payload);
      return state.set('activeOrder', order);
    }

    case actions.getActiveOrderStatusSuccess:
      return state.update('activeOrder', order => order.set('statuses', fromJS(payload)));

    case actions.openOrderDetails:
      return state.update('currentOrder', _ => {
        return state.get('list').findIndex(elem => elem._id === payload._id);
      });

    case actions.cancelOrderSuccess: {
      const order = new Order(payload);
      return state
        .set('isCancelPending', false)
        .set('activeOrder', order);
    }

    case actions.cancelOrder:
      return state.set('isCancelPending', true);

    case actions.cancelOrderError:
      return state.set('isCancelPending', false);

    case actions.reportDeliveryIssueError:
    case actions.reportDeliveryIssueSuccess:
      return state.set('isDeliveryIssuePending', false);

    case actions.reportDeliveryIssue:
      return state.set('isDeliveryIssuePending', true);

    // Do not do anything if list not yet loaded
    // Unshift if new Order
    // Update if toggled and already in the list
    case actions.maybeSaveActiveOrder:
      return state.update('list', history => {
        if (!history) return null;
        const activeOrder = state.activeOrder;
        const idx = history.findIndex(order => order._id === activeOrder._id);
        return idx > -1
          ? history.set(idx, activeOrder)
          : history.unshift(activeOrder);
      });

  }

  return state;

}
