import pureRender from '@moonjs/react-native-purerender';
import React, {View, Text} from 'react-native';
import {globalError} from '../app/app.style';
import Input from '../components/input.react';
import Form from './registerForm';

/**
 * A RegisterForm component page
 */
class RegisterForm extends React.Component {

  static propTypes = {
    form: React.PropTypes.instanceOf(Form).isRequired,
    msg: React.PropTypes.object.isRequired,
    onInputChange: React.PropTypes.func,
    onInputSubmit: React.PropTypes.func
  };

  render() {
    const {
      form: {fields},
      form,
      msg,
      onInputChange,
      onInputSubmit
    } = this.props;
    const errors = form.errors.toJS();

    return (
      <View>

        {errors.global && (
          <Text style={globalError}>{errors.global}</Text>
        )}

        <Input
          autoCapitalize='words'
          error={errors.firstName}
          onChange={(text) => onInputChange('firstName', text)}
          placeholder={msg.firstName}
          value={fields.firstName}
        />

        <Input
          autoCapitalize='words'
          error={errors.lastName}
          onChange={(text) => onInputChange('lastName', text)}
          placeholder={msg.lastName}
          value={fields.lastName}
        />

        <Input
          autoCorrect={false}
          error={errors.email}
          keyboardType='email-address'
          onChange={(text) => onInputChange('email', text)}
          placeholder={msg.email}
          value={fields.email}
        />

        <Input
          error={errors.password}
          isLast
          onChange={(text) => onInputChange('password', text)}
          onSubmitEditing={onInputSubmit}
          password
          placeholder={msg.password}
          returnKeyType='go'
          value={fields.password}
        />

      </View>
    );
  }

}

export default pureRender(RegisterForm);
