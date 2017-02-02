import React, {View, Text} from 'react-native';
import {format} from '../../intl/store';
import Button from '../../components/button.react';
import style from './basic.style';
import pureRender from '@moonjs/react-native-purerender';

class NewOrder extends React.Component {

  static propTypes = {
    msg: React.PropTypes.object.isRequired,
    onShareButtonClick: React.PropTypes.func.isRequired,
    order: React.PropTypes.object.isRequired,
    user: React.PropTypes.object.isRequired,
    venue: React.PropTypes.object.isRequired
  };

  render() {
    const {msg, user: {profile: user}, order, venue, onShareButtonClick} = this.props;

    return (
      <View style={style.container}>

        <Text style={style.heading}>
          {format(msg.title, user)}
        </Text>

        <Text style={style.subHeading}>
          {order.statusDetails || (order.isCollection() && venue.collectionMessage) || format(msg.description, user)}
        </Text>

        <View style={style.content}>
          <Text style={[style.smallParagraph, {marginBottom: 25}]}>
            {msg.summary}
          </Text>
          <Button
            className='def'
            onPress={onShareButtonClick}
            title={msg.button.share}
          />
        </View>

      </View>
    );
  }

}

export default pureRender(NewOrder);
