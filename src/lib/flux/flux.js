/* eslint-disable no-console */
/* global __DEV__ */

import EventEmitter from 'eventemitter3';

export default class Flux extends EventEmitter {

  constructor(store, state) {
    super();
    this.store = store;
    this.state = store(state);
  }

  dispatch(action, payload, meta?) {
    if (Array.isArray(action)) {
      return action.forEach(action => this.dispatch(action, payload, meta));
    }
    if (__DEV__) {
      console.log(`Dispatching ${action.toString()}`);
    }
    this.state = this.store(this.state, action, payload);
    this.emit('dispatch', this.state, action, payload, meta);
  }

  load(state) {
    this.state = this.store(state);
    this.emit('dispatch', this.state);
  }

}
