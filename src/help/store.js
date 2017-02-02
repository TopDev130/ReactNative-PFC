import {actions} from './actions';
import HelpItem from './helpItem';
import {List} from 'immutable';
import HelpState from './state';

const initialState = new HelpState();

const revive = state => {
  const items = state.get('list');
  return initialState.merge({
    list: items ? items.map(item => new HelpItem(item)) : null
  });
};

export default function helpStore(state = initialState, action, payload) {
  if (!action) return revive(state);

  switch (action) {

    case actions.getHelpItems:
      return state
        .remove('error')
        .set('isPending', !state.list || state.list.size === 0);

    case actions.getHelpItemsError:
      return state
        .set('error', payload)
        .remove('list')
        .remove('isPending');

    case actions.getHelpItemsSuccess:
      return state
        .remove('isPending')
        .set('list', List(payload.map(item => new HelpItem(item))));

    case actions.openItemDetails: {
      const order = state.get('list')
        .findIndex(elem => elem._id === payload._id);
      return state.set('currentItem', order);
    }

  }

  return state;

}
