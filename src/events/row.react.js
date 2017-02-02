import React, {Text, Image, View, TouchableWithoutFeedback} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import FadeIn from '@moonjs/react-native-fadein';
import Event from './event';
import LinearGradient from 'react-native-linear-gradient';
import {dateFormat} from '../intl/store';
import style from './row.style';

class EventRow extends React.Component {

  static propTypes = {
    event: React.PropTypes.instanceOf(Event).isRequired,
    onSelected: React.PropTypes.func
  };

  static defaultProps = {
    onSelected: () => {}
  };

  render() {
    const {event, onSelected} = this.props;

    const image = <Image source={{uri: event.background}} style={style.backgroundImage} />;

    return (
      <TouchableWithoutFeedback onPress={onSelected}>
        <View style={style.container}>
          <FadeIn image={image}>
            <LinearGradient colors={['#000000', 'rgba(0, 0, 0, 0.4)', '#000000']} style={style.gradient}>
              <View style={style.content}>
                <Text style={style.date}>{dateFormat(event.start, 'Do MMMM')}</Text>
                <Text style={style.title}>{event.title}</Text>
              </View>
            </LinearGradient>
          </FadeIn>
        </View>
      </TouchableWithoutFeedback>
    );
  }

}

export default pureRender(EventRow);
