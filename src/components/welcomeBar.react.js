import React, {Animated, Image, View, Text, InteractionManager, TouchableOpacity} from 'react-native';

import style, {height} from './welcomeBar.style';

const contentOffset = -50;

export default class WelcomeBar extends React.Component {

  static propTypes = {
    isVisible: React.PropTypes.bool,
    msg: React.PropTypes.object.isRequired,
    onDismiss: React.PropTypes.func.isRequired,
    title: React.PropTypes.string.isRequired
  };

  state = {
    top: new Animated.Value(-height + contentOffset)
  };

  componentDidMount() {
    if (this.props.isVisible) {
      InteractionManager.runAfterInteractions(_ => {
        Animated
          .spring(this.state.top, {
            fromValue: -height + contentOffset,
            toValue: contentOffset,
            tension: 30
          })
          .start();
      });

    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isVisible && !this.props.isVisible) {
      this.hide();
    }
  }

  hide() {
    Animated
      .spring(this.state.top, {
        fromValue: contentOffset,
        toValue: -height + contentOffset,
        tension: 30
      })
      .start();
  }

  isVisible() {
    return this.state.top.__getValue() === contentOffset;
  }

  render() {
    const {title, msg, onDismiss} = this.props;

    return (
      <Animated.View style={[style.container, {top: this.state.top}]}>

        <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
          <Text style={style.title}>
            {msg.heading.toUpperCase()}
          </Text>

          <Text style={style.name}>
            {title.toUpperCase()}
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={onDismiss}
          style={style.link}>
            <Image source={require('../../assets/images/close_transparent.png')} />
        </TouchableOpacity>

      </Animated.View>
    );

  }

}
