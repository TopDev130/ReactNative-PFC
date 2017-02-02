import {Map} from 'immutable';

export function updateFormField(state, form, {name, value}) {
  return state
    .setIn([form, 'isPending'], false)
    .setIn([form, 'fields', name], value)
    .setIn([form, 'errors', name], null)
    .setIn([form, 'errors', 'global'], null);
}

export function updateFormError(state, form, errors) {
  return state
    .setIn([form, 'isPending'], false)
    .setIn([form, 'errors'], Map(errors));
}

export function markFormPending(state, form) {
  return state
    .setIn([form, 'isPending'], true)
    .setIn([form, 'errors', 'global'], null);
}
