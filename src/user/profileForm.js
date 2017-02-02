import {Record, Map} from 'immutable';

const ProfileFormRecord = Record({
  fields: new (Record({
    firstName: '',
    lastName: '',
    email: '',
    dob: ''
  })),
  errors: Map({}),
  isPending: false,
  isDatePickerVisible: false
});

export default class ProfileForm extends ProfileFormRecord {}
