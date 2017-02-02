import React, {View, ScrollView, Text} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import Header from '../components/header.react';
import Button from '../components/button.react';
import * as Analytics from 'Analytics';

import style from './helpItem.style';

class HelpItem extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    help: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired
  };

  goToContactPage() {
    Analytics.showMessagesList();
  }

  render() {
    const {
      help: {currentItem: {title: itemTitle, body}},
      msg: {
        help: {title},
        helpItem: {button: {contact}}
      },
      navigation
    } = this.props;

    return (
      <View style={style.container}>

        <Header
          onBackIconClick={navigation.pop}
          title={title}
          withBorder
        />

        <ScrollView>
          <Text style={style.title}>{itemTitle}</Text>
          <Text style={style.content}>{body}</Text>

          <Button
            className='secondary'
            onPress={() => this.goToContactPage()}
            style={style.contactButton}
            title={contact}
          />
        </ScrollView>

      </View>
    );
  }
}

export default pureRender(
  HelpItem,
  ['app']
);
