import {facebook as facebookConfig} from '../config';
import {FBSDKLoginManager} from 'react-native-fbsdklogin';
import {FBSDKAccessToken} from 'react-native-fbsdkcore';

// @todo see what errors are returned and decide what to do
// I am not sure if err objects will have code property, if not, debug like I do
// in stripe by following names. When this is done, just remove these lines.
function parseError(err) {
  let newError = {};
  newError.global = err.message;
  return newError;
}

export function login() {
  return Promise.fromNode(cb => {
    FBSDKLoginManager.logInWithReadPermissions(facebookConfig.permissions, cb);
  }).catch(parseError);
}

export function getToken() {
  return Promise.fromNode(cb => {
    FBSDKAccessToken.getCurrentAccessToken(result => {
      const error = result ? null : {};
      cb(error, result && result.tokenString);
    });
  });
}
