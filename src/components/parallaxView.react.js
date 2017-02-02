import React, {Dimensions, View, ScrollView, Animated} from 'react-native';
import style from './parallaxView.style';

const screen = Dimensions.get('window');

export default class ParallaxView extends React.Component {

  state = {
    scrollY: new Animated.Value(0)
  };

  static propTypes = {
    backgroundSource: React.PropTypes.object,
    blur: React.PropTypes.string,
    children: React.PropTypes.node,
    contentInset: React.PropTypes.object,
    header: React.PropTypes.node,
    style: React.PropTypes.any,
    windowHeight: React.PropTypes.number
  };

  static defaultProps = {
    contentInset: {
      top: screen.scale
    },
    windowHeight: 300
  };

  renderBackground() {
    const {windowHeight, backgroundSource} = this.props;
    const {scrollY} = this.state;

    if (!windowHeight || !backgroundSource) return null;

    return (
      <Animated.Image
        source={backgroundSource}
        style={[style.background, {
          height: windowHeight,
          transform: [{
            translateY: scrollY.interpolate({
              inputRange: [ -windowHeight, 0, windowHeight],
              outputRange: [windowHeight / 2, 0, -windowHeight / 3]
            })
          }, {
            scale: scrollY.interpolate({
              inputRange: [ -windowHeight, 0, windowHeight],
              outputRange: [2, 1, 1]
            })
          }]
        }]}
      />
    );
  }

  renderHeader() {
    const {windowHeight, backgroundSource} = this.props;
    const {scrollY} = this.state;

    if (!windowHeight || !backgroundSource) return null;

    return (
      <Animated.View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        opacity: scrollY.interpolate({
          inputRange: [-windowHeight, 0, windowHeight / 1.2],
          outputRange: [1, 1, 0]
        })
      }}>
        {this.props.header}
      </Animated.View>
    );
  }

  render() {
    const {style: passStyle, windowHeight, ...props} = this.props;

    return (
      <View style={[style.container, passStyle]}>
        {this.renderBackground()}
        <ScrollView
          {...props}
          automaticallyAdjustContentInsets={false}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
          )}
          scrollEventThrottle={16}
          style={style.scrollView}>
          <View style={{height: windowHeight}} />
          <View style={style.content}>
            {this.props.children}
          </View>
        </ScrollView>
        {this.renderHeader()}
      </View>
    );
  }

}
