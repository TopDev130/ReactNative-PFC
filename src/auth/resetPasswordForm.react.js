import pureRender from '@moonjs/react-native-purerender';
import React, {View, Text} from 'react-native';
import {globalError} from '../app/app.style';
import Input from '../components/input.react';
import Form from './resetPasswordForm';

/**
 * A ResetPasswordForm component page
 */
class ResetPasswordForm extends React.Component {

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
          autoCorrect={false}
          error={errors.email}
          isLast
          keyboardType='email-address'
          onChange={(text) => onInputChange('email', text)}
          onSubmitEditing={onInputSubmit}
          placeholder={msg.email}
          returnKeyType='go'
          value={fields.email}
        />

      </View>
    );
  }

}

export default pureRender(ResetPasswordForm);
