import React, {View, Text} from 'react-native';
import Button from '../../components/button.react';
import style from './basic.style';
import pureRender from '@moonjs/react-native-purerender';

class ExpiredCard extends React.Component {

  static propTypes = {
    msg: React.PropTypes.object.isRequired,
    onCloseButtonClick: React.PropTypes.func.isRequired
  };

  render() {
    const {msg, onCloseButtonClick} = this.props;

    return (
      <View style={style.container}>
        <Text style={style.heading}>
          {msg.title}
        </Text>
        <Text style={style.subHeading}>
          {msg.description}
        </Text>
        {msg.note && (
          <Text style={[style.note, {marginTop: 5}]}>
            {msg.note}
          </Text>
        )}
        <View style={style.content}>
          <Button
            className='def'
            onPress={onCloseButtonClick}
            title={msg.button}
          />
        </View>
      </View>
    );
  }

}

export default pureRender(ExpiredCard);
