import {Record} from 'immutable';
import colors from '../colors';

const VenueLabelRecord = Record({
  kind: '',
  title: '',
  showOnMenu: false,
  showOnList: false
});

export default class VenueLabel extends VenueLabelRecord {

  getColor() {
    return colors.labels[this.kind] || colors.labels.info;
  }

}
