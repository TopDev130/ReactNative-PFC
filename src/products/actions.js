import {actions as app} from '../app/actions';

export const actions = create();
export const feature = 'products';

export function create(dispatch, api) {

  return {

    getProductsError() {},
    getProductsSuccess() {},
    getProducts(venue) {
      dispatch(actions.getProducts);

      return api
        .fetch(`venues/${venue._id}/products`)
        .tap(payload => dispatch(actions.getProductsSuccess, { data: payload, venue }))
        .catch(err => {
          dispatch([actions.getProductsError, app.apiError], err);
          throw err;
        });
    },

    selectProductCategory(category) {
      dispatch(actions.selectProductCategory, category);
    }

  };

}
