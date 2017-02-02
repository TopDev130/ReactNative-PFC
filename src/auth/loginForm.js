import {Record, Map} from 'immutable';

const LoginFormRecord = Record({
  fields: new (Record({
    email: '',
    password: ''
  })),
  isPending: false,
  errors: Map({})
});

export default class LoginForm extends LoginFormRecord {}
