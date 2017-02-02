import React, {TextInput, Text, View} from 'react-native';
import style from './input.style';

export default class Input extends React.Component {

  static propTypes = {
    error: React.PropTypes.string,
    inputStyle: React.PropTypes.object,
    isLast: React.PropTypes.bool,
    label: React.PropTypes.string,
    multiline: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    password: React.PropTypes.bool,
    placeholder: React.PropTypes.string,
    textAlign: React.PropTypes.string,
    value: React.PropTypes.any
  };

  static defaultProps = {
    error: null,
    inputStyle: {},
    isLast: false,
    onChange: function() {},
    password: false
  };

  /**
   * Bubbles up native event
   *
   * @param {Object} event handler
   */
  onFieldChange(event) {
    const text = event.nativeEvent.text;
    this.props.onChange(text);
  }

  setNativeProps(...args) {
    this.refs.container.setNativeProps(...args);
  }

  /**
   * Dismisses the underlaying textInput
   *
   * @description
   * Make the keyboard dissapear. This is just a proxy to NativeMixins
   * that are only exposed on built-in React Native components (like TextInput)
   */
  blur() {
    this.refs.textInput.blur();
  }

  render() {
    const {
      value, label, textAlign, password, inputStyle: inputPassedStyle,
      placeholder, error,
      ...passProps
    } = this.props;

    let wrapperStyle = [style.inputWrapper];
    let inputStyle = [style.input];

    if (this.props.isLast) {
      wrapperStyle.push(style.lastWrapper);
    }

    if (this.props.multiline) {
      inputStyle.push(style.inputWithMultilines);
    }

    if (error) {
      wrapperStyle.push(style.inputWithErrorWrapper);
    }

    wrapperStyle.push(inputPassedStyle);

    return (
      <View ref='container' style={wrapperStyle}>

        {error && (
          <View style={style.errorWrapper}>
            <Text style={style.errorText}>{error.toUpperCase()}</Text>
          </View>
        )}

        {label && (
          <View style={style.inlineInputWrapper}>
            <Text onPress={_ => this.refs.textInput.focus()} style={style.labelInline} suppressHighlighting>
              {label.toUpperCase()}
            </Text>
            <View style={style.inputInline}>
              <TextInput
                autoCapitalize='none'
                {...passProps}
                onChange={this.onFieldChange.bind(this)}
                placeholder={placeholder && placeholder.toUpperCase()}
                ref='textInput'
                secureTextEntry={password}
                style={[inputStyle, {textAlign: textAlign || 'left'}]}
                value={value}
              />
            </View>
          </View>
        )}

        {!label && (
          <TextInput
            autoCapitalize='none'
            {...passProps}
            onChange={this.onFieldChange.bind(this)}
            placeholder={placeholder && placeholder.toUpperCase()}
            ref='textInput'
            secureTextEntry={password}
            style={inputStyle}
            value={value}
          />
        )}

      </View>
    );
  }

}
