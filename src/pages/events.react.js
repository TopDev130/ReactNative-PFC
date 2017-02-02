import React, {LayoutAnimation, View, Text} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import {animations} from '../decorators/animation';
import ProgressHUD from '@moonjs/react-native-progresshud';
import Header from '../components/header.react';
import EventsList from '../events/list.react';
import ListError from '../components/listError.react';

import style from './venues.style';

class Events extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    app: React.PropTypes.object.isRequired,
    events: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired,
    venues: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      events: {list}
    } = this.props;

    if (!list) {
      this.loadEvents().then(() => {
        LayoutAnimation.configureNext(animations.layout.spring);
      });
    }
  }

  loadEvents = () => {
    const {
      venues: {activeVenue: venue},
      actions: {events}
    } = this.props;

    return events.getEvents(venue);
  };

  onEventSelected(event) {
    this.props.actions.events.selectEvent(event);
    this.props.navigation.transitionTo('eventDetails');
  }

  render() {
    const {
      actions: {app: {toggleMenu}},
      events: {list: events, isPending, error},
      msg: {events: msg}
    } = this.props;

    return (
      <View style={style.container}>

        <Header
          onMenuIconClick={toggleMenu}
          style={style.header}
          title={msg.title}
          withBorder
        />

        {events && events.size > 0 && (
          <View style={style.content}>
            <EventsList
              items={events}
              onRefresh={this.loadEvents}
              onSelected={this.onEventSelected.bind(this)}
            />
          </View>
        )}

        {events && events.size === 0 && (
          <View style={style.emptyList}>
            <Text style={style.emptyListText}>
              {msg.noEvents.toUpperCase()}
            </Text>
          </View>
        )}

        {error && error.global && (
          <ListError
            onReload={this.loadEvents.bind(this)}
          />
        )}

        <ProgressHUD isVisible={isPending} />

      </View>
    );
  }
}

export default pureRender(Events, ['app']);
