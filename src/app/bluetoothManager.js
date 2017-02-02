/* eslint no-unused-vars: 0 */
import { NativeModules, DeviceEventEmitter } from 'react-native';
const { BluetoothManager: Bluetooth } = NativeModules;

export const STATE = {
  UNKNOWN: 'unknown',
  RESETTING: 'resetting',
  UNSUPPORTED: 'unsupported',
  UNAUTHORIZED: 'unauthorized',
  OFF: 'off',
  ON: 'on'
};

export const addStateListener = (func) => DeviceEventEmitter.addListener('bluetoothManagerDidUpdateState', func);
