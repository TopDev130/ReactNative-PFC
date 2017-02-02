import {Navigator} from 'react-native';
import SlideFromLeft from './lib/slideFromLeft';
import colors from './colors';
import {isSingleVenue} from './config';

/**
 * White routes are 99% of the app, like Champagnes or Venues
 */
const DEFAULT_ROUTE = {
  backgroundColor: colors.routes.grey,
  flex: 1,
  paddingTop: 40
};


/**
 * Light routes are the authentication ones
 */
const LIGHT_ROUTE = {
  ...DEFAULT_ROUTE,
  backgroundColor: colors.routes.def
};

const GRAY_ROUTE = {
  ...DEFAULT_ROUTE,
  backgroundColor: colors.routes.darkGrey
};

/**
 * Dark routes are the processing routes & welcome page
 */
const DARK_ROUTE = {
  ...DEFAULT_ROUTE,
  backgroundColor: colors.routes.dark
};

const ROUTES = {

  basket: {
    component: require('./pages/basket.react').default,
    animationType: Navigator.SceneConfigs.FloatFromBottom,
    style: GRAY_ROUTE,
    name: 'Basket'
  },

  legal: {
    component: require('./pages/legal.react').default,
    animationType: SlideFromLeft,
    style: DEFAULT_ROUTE,
    name: 'Legal'
  },

  products: {
    component: require('./pages/products.react').default,
    animationType: SlideFromLeft,
    style: LIGHT_ROUTE,
    name: 'Products'
  },

  legalItem: {
    component: require('./pages/legalItem.react').default,
    animationType: SlideFromLeft,
    style: LIGHT_ROUTE,
    name: 'Legal item'
  },

  location: {
    component: require('./pages/location.react').default,
    animationType: SlideFromLeft,
    style: DEFAULT_ROUTE,
    name: 'Location'
  },

  locationError: {
    component: require('./pages/locationError.react').default,
    animationType: Navigator.SceneConfigs.FloatFromBottom,
    style: DEFAULT_ROUTE,
    name: 'Location error'
  },

  helpItem: {
    component: require('./pages/helpItem.react').default,
    animationType: SlideFromLeft,
    style: LIGHT_ROUTE,
    name: 'Help item'
  },

  help: {
    component: require('./pages/help.react').default,
    animationType: SlideFromLeft,
    style: LIGHT_ROUTE,
    name: 'Help'
  },

  categories: {
    component: require('./pages/categories.react').default,
    animationType: SlideFromLeft,
    style: LIGHT_ROUTE,
    name: 'Categories'
  },

  profile: {
    component: require('./pages/profile.react').default,
    animationType: SlideFromLeft,
    style: LIGHT_ROUTE,
    name: 'Profile'
  },

  events: {
    component: require('./pages/events.react').default,
    animationType: SlideFromLeft,
    style: LIGHT_ROUTE,
    name: 'Events'
  },

  eventDetails: {
    component: require('./pages/eventDetails.react').default,
    animationType: SlideFromLeft,
    style: LIGHT_ROUTE,
    name: 'Event details'
  },

  venues: {
    component: isSingleVenue ? require('./pages/venueLoader.react').default : require('./pages/venues.react').default,
    animationType: SlideFromLeft,
    style: LIGHT_ROUTE,
    name: 'Venues'
  },

  venueDetails: {
    component: require('./pages/venueDetails.react').default,
    animationType: SlideFromLeft,
    style: LIGHT_ROUTE,
    name: 'Venue details'
  },

  chooseVenue: {
    component: require('./pages/chooseVenue.react').default,
    animationType: SlideFromLeft,
    style: LIGHT_ROUTE,
    name: 'Choose venue'
  },

  scanYourCard: {
    component: require('./pages/scanYourCard.react').default,
    animationType: SlideFromLeft,
    style: DEFAULT_ROUTE,
    name: 'Scan your card'
  },

  newPassword: {
    component: require('./pages/newPassword.react').default,
    animationType: SlideFromLeft,
    style: DEFAULT_ROUTE,
    name: 'New password'
  },

  resetPassword: {
    component: require('./pages/resetPassword.react').default,
    animationType: SlideFromLeft,
    style: DEFAULT_ROUTE,
    name: 'Reset password'
  },

  orders: {
    component: require('./pages/orders.react').default,
    animationType: SlideFromLeft,
    style: LIGHT_ROUTE,
    name: 'Orders'
  },

  orderDetails: {
    component: require('./pages/orderDetails.react').default,
    animationType: SlideFromLeft,
    style: LIGHT_ROUTE,
    name: 'Order details'
  },

  orderProblem: {
    component: require('./pages/orderProblem.react').default,
    animationType: SlideFromLeft,
    style: LIGHT_ROUTE,
    name: 'Order problem'
  },

  orderDeliveryIssue: {
    component: require('./pages/orderDeliveryIssue.react').default,
    animationType: SlideFromLeft,
    style: LIGHT_ROUTE,
    name: 'Order delivery issue'
  },

  orderProcess: {
    component: require('./pages/orderProcess.react').default,
    animationType: Navigator.SceneConfigs.FloatFromBottom,
    style: DARK_ROUTE,
    name: 'Order process'
  },

  orderProcessError: {
    component: require('./pages/orderProcessError.react').default,
    animationType: Navigator.SceneConfigs.FloatFromBottom,
    style: DARK_ROUTE,
    name: 'Order process error'
  },

  welcome: {
    component: require('./pages/welcome.react').default,
    animationType: Navigator.SceneConfigs.FloatFromBottom,
    style: DARK_ROUTE,
    name: 'Welcome'
  },

  register: {
    component: require('./pages/register.react').default,
    animationType: SlideFromLeft,
    style: DEFAULT_ROUTE,
    name: 'Register'
  },

  login: {
    component: require('./pages/login.react').default,
    animationType: SlideFromLeft,
    style: DEFAULT_ROUTE,
    name: 'Login'
  },

  enterPayment: {
    component: require('./pages/enterPayment.react').default,
    animationType: Navigator.SceneConfigs.FloatFromBottom,
    name: 'Enter payment'
  },

  newPasswordCheck: {
    component: require('./pages/newPasswordCheck.react').default,
    animationType: SlideFromLeft,
    style: DEFAULT_ROUTE,
    name: 'New password check'
  }

};

export default ROUTES;
