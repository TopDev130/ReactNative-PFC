import Input from '../components/input.react';
import SectionHeader from '../components/sectionHeader.react';
import React, {View, DatePickerIOS, TouchableOpacity} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import Form from './profileForm';
import {dateFormat} from '../intl/store';

import style from './profileForm.style';

class ProfileForm extends React.Component {

  static propTypes = {
    form: React.PropTypes.instanceOf(Form).isRequired,
    msg: React.PropTypes.object.isRequired,
    onDateInputPress: React.PropTypes.func,
    onInputChange: React.PropTypes.func,
    onInputFocus: React.PropTypes.func
  };

  onDateInputPress() {
    this.blur();
    this.props.onDateInputPress();
  }

  blur() {
    const {
      firstName,
      lastName,
      email
    } = this.refs;

    firstName.blur();
    lastName.blur();
    email.blur();
  }


  render() {
    const {
      form: {fields, errors, isDatePickerVisible},
      onInputChange,
      onInputFocus,
      msg
    } = this.props;

    const formErrors = errors.toJS();

    return (
      <View>

        <SectionHeader
          error={formErrors.global}
          title={msg.personal}
        />

        <Input
          autoCapitalize='words'
          error={formErrors.firstName}
          label={msg.firstName}
          onChange={text => onInputChange('firstName', text)}
          onFocus={onInputFocus}
          ref='firstName'
          value={fields.firstName}
        />

        <Input
          autoCapitalize='words'
          error={formErrors.lastName}
          label={msg.lastName}
          onChange={text => onInputChange('lastName', text)}
          onFocus={onInputFocus}
          ref='lastName'
          value={fields.lastName}
        />

        <Input
          autoCorrect={false}
          error={formErrors.email}
          keyboardType='email-address'
          label={msg.email}
          onChange={text => onInputChange('email', text)}
          onFocus={onInputFocus}
          ref='email'
          value={fields.email}
        />

        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => this.onDateInputPress()}
          style={style.lastInput}>
          <Input
            editable={false}
            error={formErrors.dob}
            isLast
            label={msg.dob}
            value={fields.dob ? dateFormat(fields.dob) : null}
          />
        </TouchableOpacity>

        {isDatePickerVisible && (
          <View style={style.datePicker}>
            <DatePickerIOS
              date={new Date(fields.dob)}
              mode="date"
              onDateChange={date => onInputChange('dob', date.toString())}
            />
          </View>
        )}

      </View>
    );
  }
}

export default pureRender(ProfileForm);
