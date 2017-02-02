import pureRender from '@moonjs/react-native-purerender';
import React, {View, Text} from 'react-native';
import Label from '../venues/venueLabel';

import style from './venueLabel.style.js';

class VenueLabel extends React.Component {

  static propTypes = {
    label: React.PropTypes.instanceOf(Label).isRequired
  };

  render() {
    const {label} = this.props;
    const color = {backgroundColor: label.getColor()};

    return (
      <View style={[color, style.container]}>
        <Text style={style.text}>{label.title.toUpperCase()}</Text>
      </View>
    );
  }

}

export default pureRender(VenueLabel);
