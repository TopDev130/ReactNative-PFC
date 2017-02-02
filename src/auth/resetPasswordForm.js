import {Record, Map} from 'immutable';

const ResetPasswordFormRecord = Record({
  fields: new (Record({
    email: ''
  })),
  isPending: false,
  errors: Map({})
});

export default class ResetPasswordForm extends ResetPasswordFormRecord {}
