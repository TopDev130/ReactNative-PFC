import React, {View, Text} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import Button from '../components/button.react';
import Header from '../components/header.react';

import style from './chooseVenue.style';

class ChooseVenue extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired
  };

  viewVenues() {
    this.props.navigation.transitionTo('venues');
  }

  render() {
    const {
      actions: {app: {toggleMenu}},
      msg: {chooseVenue: msg}
    } = this.props;

    return (
      <View style={style.container}>
          <Header onMenuIconClick={toggleMenu} />

          <View style={style.centeredContent}>
            <Text style={style.title}>{msg.title}</Text>
            <Text style={style.subTitle}>{msg.subTitle}</Text>
          </View>

          <View style={style.stickToBottom}>
            <Button
              className='primary'
              onPress={() => this.viewVenues()}
              style={style.buttonSpacing}
              title={msg.viewVenues}
            />
          </View>

      </View>
    );
  }

}

export default pureRender(
  ChooseVenue,
  ['app']
);
