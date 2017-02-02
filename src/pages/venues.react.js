import React, {LayoutAnimation, View, Text} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import {animations} from '../decorators/animation';
import ProgressHUD from '@moonjs/react-native-progresshud';
import Header from '../components/header.react';
import VenuesList from '../venues/list.react';
import ListError from '../components/listError.react';

import style from './venues.style';

class Venues extends React.Component {

  state = {
    waitingForLocation: false
  };

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    app: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired,
    venues: React.PropTypes.object.isRequired
  };

  /**
   * @description
   * If location is known by the time this page load,
   * start loading venues. Wait for it otherwise
   * in componentDidUpdate
   */
  componentDidMount() {
    if (this.props.app.location) {
      setTimeout(_ => {
        this.loadVenuesByLocation();
      });
    } else {
      this.setState({
        waitingForLocation: true
      });
    }
  }

  componentWillReceiveProps(newProps) {
    const shouldLoadVenues = newProps.app.location
      && this.state.waitingForLocation;

    if (shouldLoadVenues) {
      this.setState({
        waitingForLocation: false
      });
      this.loadVenuesByLocation(false, newProps);
    }
  }

  /**
   * Load venues by location
   *
   * @param {Boolean} force reload, false by default
   * @param {Object} props to use for loading
   *
   * @description
   * Checks if venues are already loaded and queries API only if not.
   *
   * @returns {Promise} resolved when finished
   */
  loadVenuesByLocation(force = false, props = this.props) {
    const {
      actions: {venues: actions},
      venues: {list: items},
      app: {location}
    } = props;

    return Promise
      .resolve((!force && items) || actions.getVenues(location))
      .then(_ => {
        LayoutAnimation.configureNext(animations.layout.spring);
      });
  }

  onVenueSelected(venue) {
    this.props.actions.venues.selectVenue(venue);
    this.props.navigation.transitionTo('venueDetails');
  }

  /**
   * Renders component
   *
   * @description
   * This component has state `loading` also when location is not yet known
   * and will be resolved
   *
   * @FIXME when location won't be loaded (permissions error), let's handle that
   * case as well
   *
   * @returns {Function} React component
   */
  render() {
    const {
      actions: {app: {toggleMenu}},
      venues: {list: venues, isPending, error},
      msg: {venues: msg}
    } = this.props;

    const isWaitingForLocation = this.state.waitingForLocation;

    return (
      <View style={style.container}>

        <Header
          onMenuIconClick={toggleMenu}
          style={style.header}
          title={msg.title}
          withBorder
        />

        {venues && venues.size > 0 && (
          <View style={style.content}>
            <VenuesList
              items={venues}
              onRefresh={() => this.loadVenuesByLocation(true)}
              onSelected={this.onVenueSelected.bind(this)}
            />
          </View>
        )}

        {venues && venues.size === 0 && (
          <View style={style.emptyList}>
            <Text style={style.emptyListText}>
              {msg.noVenues.toUpperCase()}
            </Text>
          </View>
        )}

        {error && error.global && (
          <ListError
            onReload={() => this.loadVenuesByLocation(true)}
          />
        )}

        <ProgressHUD isVisible={isPending || isWaitingForLocation} />

      </View>
    );
  }
}

export default pureRender(Venues, ['app']);
