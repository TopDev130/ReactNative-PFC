import {actions} from './actions';
import {actions as venueActions} from '../venues/actions';
import Category from './category';
import {List} from 'immutable';
import ProductState from './state';

const initialState = new ProductState();

const revive = state => {
  const list = state.get('list');
  const currentCategory = state.get('currentCategory') || -1;
  return initialState.merge({
    list: list ? list.map(c => new Category(c)) : null,
    currentCategory
  });
};

export default function productsStore(state = initialState, action, payload) {
  if (!action) return revive(state);

  switch (action) {

    case venueActions.chooseVenue:
      return initialState;

    case actions.getProducts:
      return state
        .remove('error')
        .set('isPending', !state.list || state.list.size === 0);

    /**
     * If products have been already downloaded,
     * discard the error sliently since we are displaying the list
     * to users anyway
     */
    case actions.getProductsError:
      return state.list
        ? state
            .remove('isPending')
        : state
            .set('error', payload)
            .remove('isPending');

    case actions.getProductsSuccess: {
      const {data, venue} = payload;

      // Do nothing if an empty array returned, to be investigated
      if (data.length === 0) {
        return state.remove('isPending');
      }

      const items = List(data.map(cat => new Category(cat, venue)));

      return state
        .set('list', items)
        .remove('isPending');
    }

    case actions.selectProductCategory:
      return state.set('currentCategory', state.list.findIndex(cat => cat._id === payload._id));

  }

  return state;
}
