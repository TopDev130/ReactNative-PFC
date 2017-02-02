import {Record, Map} from 'immutable';

const NewPasswordFormRecord = Record({
  fields: new (Record({
    password: '',
    checkPassword: ''
  })),
  isPending: false,
  errors: Map({})
});

export default class NewPasswordForm extends NewPasswordFormRecord {}
