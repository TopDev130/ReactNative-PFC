import {Record, Map} from 'immutable';

const RegisterFormRecord = Record({
  fields: new (Record({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })),
  isPending: false,
  errors: Map({})
});

export default class RegisterForm extends RegisterFormRecord {}
