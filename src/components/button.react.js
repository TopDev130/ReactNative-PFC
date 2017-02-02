import pureRender from '@moonjs/react-native-purerender';
import React, {TouchableHighlight, Text} from 'react-native';
import * as style from './button.style';

export default class Button extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    disabled: React.PropTypes.bool,
    lowercase: React.PropTypes.bool,
    onPress: React.PropTypes.func,
    size: React.PropTypes.string,
    style: React.PropTypes.any,
    title: React.PropTypes.string
  };

  static defaultProps = {
    className: 'default',
    disabled: false,
    lowercase: false,
    onPress: function() {},
    size: 'big',
    title: '',
    passedStyle: {}
  };

  /**
   * Calls given handler only if the link is active
   */
  onButtonPressed() {
    if (!this.props.disabled) {
      this.props.onPress();
    }
  }

  render() {
    const {className, size, lowercase, disabled, title, style: passedStyle} = this.props;

    const buttonStyle = [
      style.buttonSize[size],
      style.buttonType[className],
      passedStyle,
      disabled && {opacity: 0.6}
    ];

    const buttonTextStyle = [
      style.buttonTextSize[size],
      style.buttonTextType[className]
    ];

    const buttonText = lowercase ? title : title.toUpperCase();

    const underlayColor = style.buttonUnderlayColor[className];

    return (
      <TouchableHighlight
        onPress={() => this.onButtonPressed()}
        style={buttonStyle}
        underlayColor={underlayColor}>
          <Text
            style={buttonTextStyle}>
            {buttonText}
          </Text>
      </TouchableHighlight>
    );
  }

}

export default pureRender(Button);
