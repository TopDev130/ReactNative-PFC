/**
 * Defines the most common colors used within the app.
 * Does not describe any gray patterns used for content, only
 * buttons & left menu
 */
const COLOR_TYPES = {
  warning: '#EA8542',
  secondary: '#B2B2B2',
  primary: '#68CA9A',
  tertiary: '#000000',
  info: '#3B5998',
  def: '#FFFFFF',
  dark: '#2C2C2C',
  gray: '#909090',
  sale: '#F39F14',
  error: '#EF6979'
};

const LABEL_TYPES = {
  success: '#68CA9A',
  warning: '#F39F14',
  danger: '#EF6979',
  info: '#3B5998'
};


/**
 * Describes types of routes that are within the app
 * For further meaning and usage see `./routes.js`
 */
const ROUTE_TYPES = {
  dark: '#000000',
  def: '#FFFFFF',
  grey: '#F5F5F5',
  darkGrey: '#2C2C2C'
};

export default {
  types: COLOR_TYPES,
  routes: ROUTE_TYPES,
  labels: LABEL_TYPES
};
