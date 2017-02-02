import {stripe} from '../config';

// Private function extracting response
function status(response) {
  const parseBody = response.json();

  return parseBody
    .then(body => {
      return new Promise((resolve, reject) => {

        if (response.status >= 200 && response.status < 300) {
          return resolve(body, response);
        }

        return reject(body.error, response);
      });
    });
}

// Convert stripe errors to client specific ones
function adjustError(error) {
  let newErrors = {};

  // Strip the last dot from the error message
  if (error.message[error.message.length - 1] === '.') {
    error.message = error.message.slice(0, -1);
  }

  switch (error.code) {

    case 'invalid_expiry_month':
    case 'invalid_expiry_year':
    case 'expired_card':
      newErrors.expiryDate = error.message;
      break;

    case 'incorrect_cvc':
    case 'invalid_cvc':
      newErrors.ccv = error.message;
      break;

    case 'incorrect_number':
    case 'invalid_number':
    case 'card_declined':
    default:
      newErrors.cardNumber = error.message;
  }

  throw newErrors;
}

export function fetch(url, opts = {}) {
  url = `${stripe.url}/${url}`;
  opts.headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Bearer ${stripe.token}`
  };
  return window
    .fetch(url, opts)
    .then(status)
    .catch(adjustError);
}
