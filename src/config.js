/* global __DEV__ */

const devConfig = {
  api: 'http://dev-api.pushforchampagne.com/v1/client',
  stripe: {
    url: 'https://api.stripe.com/v1',
    token: 'pk_test_1GnxFHMHyaLGh4fcByyrpsLG'
  },
  beacons: {
    maxRangeInMeters: 5
  },
  activityView: {
    excludedActivities: [
      'postToWeibo',
      'mail',
      'print',
      'assignToContact',
      'saveToCameraRoll',
      'addToReadingList',
      'postToFlickr',
      'postToVimeo',
      'postToTencentWeibo',
      'airDrop'
    ]
  },
  facebook: {
    permissions: ['email']
  },
  notifications: {
    permissions: {
      alert: true,
      badge: true,
      sound: true
    }
  },
  env: 'development',
  bluebird: {
    longStackTraces: true
  },
  isSingleVenue: false
};

const prodConfig = {
  env: 'production',
  bluebird: {
    longStackTraces: false
  },
  api: 'http://api.pushforchampagne.com/v1/client',
  stripe: {
    url: 'https://api.stripe.com/v1',
    token: 'pk_live_v5rrVMxSjVhtZuaoXPYwDxr2'
  }
};

module.exports = __DEV__
  ? devConfig
  : {...devConfig, ...prodConfig};
