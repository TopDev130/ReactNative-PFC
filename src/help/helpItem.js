import {Record} from 'immutable';

const HelpItemRecord = Record({
  _id: '',
  title: '',
  body: '',
  section: 'General'
});

export default class HelpItem extends HelpItemRecord {}
