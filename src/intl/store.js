import IntlMessageFormat from 'intl-messageformat';
import accounting from 'accounting';
import {Record} from 'immutable';
import messages from '../messages';
import moment from 'moment';

const cachedFormatters = Object.create(null);

const initialState = new (Record({
  messages: messages.en
}));

export default function intlStore(state = initialState, action, payload) {
  if (!action) return state.toJS();
  return state;
}

export function msg(sth) {
  return sth;
}

export function currency(value) {
  const precision = value % 100 === 0 ? 0 : 2;
  return accounting.formatMoney(value / 100, '£', precision);
}

export function radiansToMiles(radians) {
  return (radians * 69.0965).toFixed(1);
}

export function distance(radians) {
  return radiansToMiles(radians) + 'mi';
}

export function date(msg) {
  return format(msg, {partOfDay: getPartOfDay()});
}

export function format(msg, options = null) {
  if (!options) return msg;
  if (options.toJS) options = options.toJS();
  return getCachedFormatter(msg).format(options);
}

export function dateFormat(date, format = 'DD-MM-YYYY') {
  const toParse = date instanceof Date ? date : new Date(date);
  return moment(toParse).format(format);
}

function getCachedFormatter(message) {
  if (message in cachedFormatters) return cachedFormatters[message];
  cachedFormatters[message] = new IntlMessageFormat(message);
  return cachedFormatters[message];
}

function getPartOfDay() {
  const splitAfternoon = 12; //24hr time to split the afternoon
  const splitEvening = 17;   //24hr time to split the evening
  const currentHour = parseFloat(moment().format('HH'));

  return currentHour >= splitEvening
    ? 'evening'
    : currentHour >= splitAfternoon
      ? 'afternoon'
      : 'morning';
}
