import pureRender from '@moonjs/react-native-purerender';
import React, {View, Text} from 'react-native';
import {globalError} from '../app/app.style';
import Input from '../components/input.react';
import Form from './newPasswordForm';

/**
 * A NewPasswordForm component page
 */
class NewPasswordForm extends React.Component {

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
          error={errors.password}
          onChange={(text) => onInputChange('password', text)}
          password
          placeholder={msg.password}
          value={fields.password}
        />

        <Input
          error={errors.checkPassword}
          isLast
          onChange={(text) => onInputChange('checkPassword', text)}
          onSubmitEditing={onInputSubmit}
          password
          placeholder={msg.checkPassword}
          returnKeyType='go'
          value={fields.checkPassword}
        />

      </View>
    );
  }

}

export default pureRender(NewPasswordForm);
