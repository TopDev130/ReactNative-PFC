/* global global __DEV__ */
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

/**
 * Currently JavaScriptCore does not provide a `self` reference
 * to the global object, which is utilized by browser libraries (i.e bluebird)
 * to have a reliably reference to the global object which works in browsers
 * and web-workers alike.
 */

global.self = global;

import 'babel-polyfill';
import './node_modules/intl/index.js';
import './node_modules/intl/locale-data/jsonp/en.js';
import {bluebird as config} from './src/config';

global.Promise = require('bluebird');

if (__DEV__) {
  Promise.config(config);
  Promise.onPossiblyUnhandledRejection(error => {
    console.log('Unhandled rejection');
    console.log(error);
  });
}

// Load app
import {AppRegistry, NativeAppEventEmitter} from 'react-native';

AppRegistry.registerComponent('pfc-mobile', () => require('./src/app/app.react').default);
