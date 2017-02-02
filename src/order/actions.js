import {actions as app} from '../app/actions';

export const actions = create();
export const feature = 'order';

export function create(dispatch, api) {

  return {

    setActiveOrder(order) {
      dispatch(actions.setActiveOrder, order);
    },

    maybeSaveActiveOrder() {
      dispatch(actions.maybeSaveActiveOrder);
    },

    cancelOrderError() {},
    cancelOrderSuccess() {},
    cancelOrder(order) {
      dispatch(actions.cancelOrder);

      return api
        .fetch(`orders/${order._id}/cancelOrder`, {
          method: 'POST'
        })
        .tap(payload => dispatch(actions.cancelOrderSuccess, payload))
        .catch(err => {
          dispatch([actions.cancelOrderError, app.apiError], err);
          throw err;
        });
    },

    reportDeliveryIssueError() {},
    reportDeliveryIssueSuccess() {},
    reportDeliveryIssue(order) {
      dispatch(actions.reportDeliveryIssue);

      return api
        .fetch(`venues/${order.venue._id}/messages`, {
          method: 'POST',
          body: JSON.stringify({
            title: `Problem with order ${order.orderId}`,
            message: 'I have problems with delivery. Please check the status'
          })
        })
        .tap(payload => dispatch(actions.reportDeliveryIssueSuccess, payload))
        .catch(err => {
          dispatch([actions.reportDeliveryIssueError, app.apiError], err);
          throw err;
        });
    },

    createOrderError() {},
    createOrderSuccess() {},
    createOrder({products, venue, location}) {
      dispatch(actions.createOrder);

      return api
        .fetch('orders', {
          method: 'POST',
          body: JSON.stringify({
            products: products.map(prod => ({option: prod.option._id, quantity: prod.quantity})),
            venue: venue._id,
            location
          })
        })
        .tap(payload => dispatch(actions.createOrderSuccess, payload))
        .catch(err => {
          dispatch([actions.createOrderError, app.apiError], err);
          throw err;
        });
    },

    getOrdersError() {},
    getOrdersSuccess() {},
    getOrders() {
      dispatch(actions.getOrders);

      return api
        .fetch('orders')
        .tap(payload => dispatch(actions.getOrdersSuccess, payload))
        .catch(err => {
          dispatch([actions.getOrdersError, app.apiError], err);
          throw err;
        });
    },

    getActiveOrderStatusError() {},
    getActiveOrderStatusSuccess() {},
    getActiveOrderStatus(order) {
      dispatch(actions.getActiveOrderStatus);

      return api
        .fetch(`orders/${order._id}/statuses`)
        .tap(payload => dispatch(actions.getActiveOrderStatusSuccess, payload))
        .catch(err => {
          dispatch([actions.getActiveOrderStatusError, app.apiError], err);
          throw err;
        });
    },

    openOrderDetails(order) {
      dispatch(actions.openOrderDetails, order);
    }

  };

}
