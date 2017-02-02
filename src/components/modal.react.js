import React, {Animated, Modal, Dimensions, TouchableWithoutFeedback, View} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import trackKeyboard from '@moonjs/react-native-trackkeyboard';
import TextInputState from 'TextInputState';
import {BlurView} from 'react-native-blur';

import style from './modal.style';

const height = Dimensions.get('window').height;

class ModalPopup extends React.Component {

  state = {
    opacity: new Animated.Value(0),
    top: new Animated.Value(height * 2)
  };

  static propTypes = {
    animations: React.PropTypes.object.isRequired,
    children: React.PropTypes.object.isRequired,
    isKeyboardOpened: React.PropTypes.bool.isRequired,
    isVisible: React.PropTypes.bool,
    onBackdropPressed: React.PropTypes.func.isRequired
  };

  // If modal is about to become active,
  // reset its position
  componentWillUpdate(newProps) {
    if (!this.props.isVisible && newProps.isVisible) {
      this.setState({
        opacity: new Animated.Value(0),
        top: new Animated.Value(height * 2)
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isVisible && !prevProps.isVisible) {
      setTimeout(_ => {
        Animated
          .parallel([
            Animated.spring(this.state.opacity, {
              fromValue: 0,
              toValue: 1,
              tension: 50
            }),
            Animated.spring(this.state.top, {
              fromValue: height * 2,
              toValue: 0,
              friction: 8
            })
          ])
          .start();
      }, 200);
    }
  }

  handleBackdropPress() {
    const {
      isKeyboardOpened,
      onBackdropPressed
    } = this.props;

    if (!isKeyboardOpened) {
      Animated
        .parallel([
          Animated.spring(this.state.opacity, {
            fromValue: 1,
            toValue: 0,
            tension: 50
          }),
          Animated.spring(this.state.top, {
            toValue: height * 2,
            friction: 8
          })
        ])
        .start();

      setTimeout(onBackdropPressed, 150);
    } else {
      TextInputState
        .blurTextInput(TextInputState.currentlyFocusedField());
    }
  }

  render() {
    const {opacity, top} = this.state;

    const {
      animations: {slideUp: keyboardAnimation},
      isVisible,
      children
    } = this.props;

    const slideAnimation = {top};

    return (
      <View style={{flex: 1}}>

        <Modal
          transparent
          visible={isVisible}>

          <View style={style.modalContainer}>

            <TouchableWithoutFeedback onPress={() => this.handleBackdropPress()}>
              <Animated.View style={[style.backdrop, {opacity: opacity}]}>
                <BlurView blurType="dark" style={style.backdrop} />
              </Animated.View>
            </TouchableWithoutFeedback>

            <Animated.View style={[style.contentView, keyboardAnimation, slideAnimation]}>
              {children}
            </Animated.View>

          </View>

        </Modal>

      </View>
    );

  }
}

export default trackKeyboard(
  pureRender(ModalPopup),
  {scaleFactor: 1.7}
);
