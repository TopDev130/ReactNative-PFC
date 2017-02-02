import pureRender from '@moonjs/react-native-purerender';
import React, {View, Text} from 'react-native';
import {globalError} from '../app/app.style';
import Input from '../components/input.react';
import Form from './paymentForm';

/**
 * A PaymentForm component page
 */
class PaymentForm extends React.Component {

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
          error={errors.cardNumber}
          keyboardType='numeric'
          onChange={(text) => onInputChange('cardNumber', text)}
          placeholder={msg.cardNumber}
          value={fields.cardNumber}
        />

        <Input
          error={errors.expiryDate}
          onChange={(text) => onInputChange('expiryDate', text)}
          placeholder={msg.expiryDate}
          value={fields.expiryDate}
        />

        <Input
          error={errors.ccv}
          keyboardType='numeric'
          onChange={(text) => onInputChange('ccv', text)}
          onSubmitEditing={onInputSubmit}
          placeholder={msg.ccv}
          returnKeyType='go'
          value={fields.ccv}
        />

        <Input
          error={errors.cardName}
          isLast
          onChange={(text) => onInputChange('cardName', text)}
          placeholder={msg.cardName}
          value={fields.cardName}
        />

      </View>
    );
  }

}

export default pureRender(PaymentForm);
