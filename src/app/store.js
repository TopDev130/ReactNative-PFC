import immutable, {Record} from 'immutable';
import Location from './location';
import AvailableApp from './availableApp';
import {actions} from './actions';

// Import all stores
import authStore from '../auth/store';
import intlStore from '../intl/store';
import orderStore from '../order/store';
import venueStore from '../venues/store';
import userStore from '../user/store';
import helpStore from '../help/store';
import eventsStore from '../events/store';
import productStore from '../products/store';
import basketStore from '../basket/store';

const initialState = new (Record({
  isMenuOpened: false,
  error: null,
  location: null,
  statusBarStyle: 'default',
  isStatusBarHidden: false,
  isBasketVisible: false,
  availableApps: {},
  settingsURL: ''
}));

const revive = state => initialState.merge({
  location: state.get('location')
    ? new Location(state.get('location'))
    : null,
  availableApps: state.get('availableApps')
    ? state.get('availableApps')
        .filter(isAvailable => !!isAvailable)
        .mapEntries(([type]) => [type, new AvailableApp(type)])
        .toArray()
    : {},
  settingsURL: state.get('settingsURL')
});

function appStore(state = initialState, action, payload) {
  if (!action) return revive(state);

  switch (action) {

    case actions.changeStatusBarStyle:
      return state.set('statusBarStyle', payload);

    case actions.showBasketBar:
      return state.set('isBasketVisible', true);

    case actions.hideBasketBar:
      return state.set('isBasketVisible', false);

    case actions.toggleStatusBar:
      return state.update('isStatusBarHidden', isHidden => !isHidden);

    case actions.showStatusBar:
      return state.set('isStatusBarHidden', false);

    case actions.hideStatusBar:
      return state.set('isStatusBarHidden', true);

    case actions.toggleMenu: {
      const newState = state.update('isMenuOpened', isOpened => !isOpened);
      return newState.update('isStatusBarHidden', isHidden => newState.isMenuOpened);
    }

    case actions.updatePosition:
      const {latitude, longitude} = payload;
      return state
        .set('location', new Location({
          lat: latitude,
          lng: longitude
        }));

  }

  return state;
}

export default function registerStores(state = {}, action, payload) {

  if (!action) {
    state = immutable.fromJS(state);
  }

  state = state
    .update('app', (s) => appStore(s, action, payload))
    .update('auth', (s) => authStore(s, action, payload))
    .update('venues', (s) => venueStore(s, action, payload))
    .update('orders', (s) => orderStore(s, action, payload))
    .update('intl', (s) => intlStore(s, action, payload))
    .update('help', (s) => helpStore(s, action, payload))
    .update('user', (s) => userStore(s, action, payload))
    .update('products', (s) => productStore(s, action, payload))
    .update('basket', (s) => basketStore(s, action, payload))
    .update('events', (s) => eventsStore(s, action, payload));

  state = state
    .set('isLoggedIn', !!state.get('user').profile)
    .set('msg', state.get('intl').messages);

  return state;
}
