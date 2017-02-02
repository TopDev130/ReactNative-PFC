import React, {View, Text} from 'react-native';
import ProgressHUD from '@moonjs/react-native-progresshud';
import pureRender from '@moonjs/react-native-purerender';
import style from './newPasswordCheck.style';
import venueStyle from './venues.style';

class NewPasswordCheck extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    auth: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired,
    resetPasswordToken: React.PropTypes.string.isRequired
  };

  componentWillMount() {
    const {
      actions: {auth: actions},
      navigation,
      resetPasswordToken
    } = this.props;

    actions
      .validateResetToken(resetPasswordToken)
      .then(_ => {
        navigation.transitionTo('newPassword', {resetPasswordToken});
      });
  }

  render() {
    const {
      auth: {newPasswordCheck: {isPending}},
      auth: {newPasswordCheck}
    } = this.props;

    const errors = newPasswordCheck.errors.toJS();

    return (
      <View style={style.container}>

        {errors && errors.global && (
          <View style={venueStyle.emptyList}>
            <Text style={venueStyle.emptyListText}>
              {errors.global.toUpperCase()}
            </Text>
          </View>
        )}

        <ProgressHUD isVisible={isPending} />

      </View>
    );
  }

}

export default pureRender(NewPasswordCheck, ['app']);
