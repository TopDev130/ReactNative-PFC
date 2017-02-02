import React, {View, Easing, Text, TouchableWithoutFeedback, Animated} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import {currency, format} from '../intl/store';
import style, {height, padding} from './bar.style';
import colors from '../colors';

class BasketBar extends React.Component {

  state = {
    bottom: new Animated.Value(-height),
    colorRange: new Animated.Value(0)
  };

  static propTypes = {
    basketCount: React.PropTypes.number.isRequired,
    basketPrice: React.PropTypes.number.isRequired,
    isVisible: React.PropTypes.bool,
    msg: React.PropTypes.object.isRequired,
    onPress: React.PropTypes.func
  };

  static defaultProps = {
    onPress: () => {}
  };

  componentWillMount() {
    if (this.props.isVisible) {
      this.setState({
        bottom: new Animated.Value(-padding)
      });
    }
  }

  /*
   * Manages in-component animations
   *
   * Every-time new item is added - basket should blink. It should do the same
   * when it appears for the first time in parallel with animateIn animation
   *
   * When it's disabled, it should animate out nicely
   */
  componentWillReceiveProps(props) {
    if (this.props.isVisible && !props.isVisible) {
      this.animateOut();
      return;
    }

    if (!this.props.isVisible && props.isVisible) {
      const shouldBlink = this.props.basketCount === 0 && props.basketCount > 0;
      this.animateIn(shouldBlink);
      return;
    }

    if (this.props.basketCount !== props.basketCount) {
      this.blink().start();
    }
  }

  blink() {
    return Animated.sequence([
      Animated.timing(this.state.colorRange, {
        toValue: 1,
        easing: Easing.inOut(Easing.quad)
      }),
      Animated.timing(this.state.colorRange, {
        toValue: 0,
        easing: Easing.inOut(Easing.quad)
      })
    ]);
  }

  animateIn(shouldBlink) {
    const animations = [
      Animated.spring(this.state.bottom, {
        toValue: -padding
      })
    ];

    if (shouldBlink) {
      animations.push(this.blink());
    }

    Animated.parallel(animations, {stopTogether: false}).start();
  }

  animateOut() {
    Animated
      .spring(this.state.bottom, {
        toValue: -height
      })
      .start();
  }

  render() {
    const {basketCount, basketPrice, onPress, msg} = this.props;
    const backgroundColor = this.state.colorRange.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.types.dark, colors.types.primary]
    });

    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <Animated.View style={[style.container, {bottom: this.state.bottom, backgroundColor}]}>
          <Text style={style.text}>{msg.title.toUpperCase()}</Text>
          <Text style={style.text}>{format(msg.items, {quantity: basketCount}).toUpperCase()}</Text>
          <Text style={style.text}>{currency(basketPrice)}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }

}

export default pureRender(BasketBar);
