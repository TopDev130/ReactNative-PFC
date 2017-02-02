import {actions} from './actions';
import Event from './event';
import {actions as venueActions} from '../venues/actions';
import EventState from './state';
import {List} from 'immutable';

const initialState = new EventState();

const revive = state => {
  const list = state.get('list');
  const currentEvent = state.get('currentEvent') || -1;
  return initialState.merge({
    list: list ? list.map(event => new Event(event)) : null,
    currentEvent
  });
};

export default function eventStore(state = initialState, action, payload) {
  if (!action) return revive(state);

  switch (action) {

    case actions.getEvents:
      return state
        .set('isPending', !state.list || state.list.size === 0)
        .remove('currentEvent')
        .remove('error');

    case actions.getEventsError:
      return state
        .remove('isPending')
        .remove('list')
        .set('error', payload);

    case actions.getEventsSuccess:
      return state
        .remove('isPending')
        .set('list', List(payload.map(event => new Event(event))));

    case actions.selectEvent:
      return state.set('currentEvent', findIndexInList(state, payload));

    case venueActions.chooseVenue:
      return state
        .remove('list')
        .remove('currentEvent');

  }

  return state;
}

function findIndexInList(events, data) {
  return events.get('list').findIndex(event => event._id === data._id);
}
