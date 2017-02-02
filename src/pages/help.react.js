import React, {View, LayoutAnimation, Text} from 'react-native';
import Header from '../components/header.react';
import {animations} from '../decorators/animation';
import ProgressHUD from '@moonjs/react-native-progresshud';
import pureRender from '@moonjs/react-native-purerender';
import HelpItemsList from '../help/list.react';
import ListError from '../components/listError.react';
import * as Analytics from 'Analytics';

import style from './help.style';
import orderStyle from './orders.style';

class HelpPage extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    help: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      help: {list}
    } = this.props;

    if (!list) {
      this.loadHelpItems();
    }
  }

  loadHelpItems() {
    return this.props.actions.help
      .getHelpItems()
      .then(_ => {
        LayoutAnimation.configureNext(animations.layout.spring);
      });
  }

  onListRefresh = () => this.loadHelpItems();

  onItemSelected(item) {
    const {
      actions: {help: actions},
      navigation
    } = this.props;

    actions.openItemDetails(item);
    navigation.transitionTo('helpItem');
  }

  render() {
    const {
      actions: {app: {toggleMenu}},
      help: {list, isPending, error},
      msg: {help: msg}
    } = this.props;

    return (
      <View style={style.container}>

        <Header
          onMenuIconClick={toggleMenu}
          onRightIconClick={_ => Analytics.showMessagesList()}
          rightIconSource={require('../../assets/images/Contact.png')}
          style={style.header}
          title={msg.title}
          withBorder
        />

        {list && list.size > 0 && (
          <HelpItemsList
            items={list}
            onRefresh={this.onListRefresh}
            onSelected={this.onItemSelected.bind(this)}
          />
        )}

        {list && list.size === 0 && (
          <View style={orderStyle.emptyList}>
            <Text style={orderStyle.emptyListText}>
              {msg.noItems.toUpperCase()}
            </Text>
          </View>
        )}

        {error && error.global && (
          <ListError onReload={this.loadHelpItems.bind(this)} />
        )}

        <ProgressHUD isVisible={isPending} />

      </View>
    );
  }
}

export default pureRender(
  HelpPage,
  ['app']
);
