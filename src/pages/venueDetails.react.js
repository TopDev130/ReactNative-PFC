import React, {View, Image, Text, TouchableOpacity, Linking} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import ParallaxView from '../components/parallaxView.react';
import ActionSheetIOS from 'ActionSheetIOS';
import style, {windowHeight} from './venueDetails.style';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../components/button.react.js';
import {trackEvent} from 'Analytics';
import {radiansToMiles} from '../intl/store';
import {isSingleVenue} from '../config';

// Styles
import * as appStyle from '../app/app.style';

class VenueDetails extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    app: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired,
    venues: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.actions.app.changeStatusBarStyle('light-content');
  }

  componentWillUnmount() {
    this.props.actions.app.changeStatusBarStyle();
  }

  goBack() {
    this.props.actions.app.changeStatusBarStyle();
    this.props.navigation.pop();
  }

  callVenue() {
    const venue = this.props.venues.currentVenue;
    Linking.openURL(`telprompt://${venue.phone}`);
  }

  takeToVenue() {
    const {
      app: {availableApps, location},
      venues: {currentVenue: venue}
    } = this.props;

    const options = availableApps
      .map(app => app.name)
      .toJS();

    ActionSheetIOS.showActionSheetWithOptions({
      options: options.concat(['Cancel']),
      cancelButtonIndex: options.length
    }, buttonIndex => {
      if (buttonIndex >= options.length) return;

      const deepLink = availableApps
        .get(buttonIndex)
        .generateDeepLink(location, venue.address);

      Linking.openURL(deepLink);
    });
  }

  chooseVenue() {
    const {
      venues: {currentVenue: venue},
      navigation,
      actions: {
        app: {changeStatusBarStyle},
        venues
      }
    } = this.props;

    venues.chooseVenue(venue, isSingleVenue);

    navigation.transitionToTop('categories');

    trackEvent('Entered Venue', {venue: venue.title});

    changeStatusBarStyle();
  }

  renderHeader() {
    const {
      actions: {app: actions}
    } = this.props;

    const imageIcon = isSingleVenue
      ? require('../../assets/images/white_menu.png')
      : require('../../assets/images/small_white_arrow.png');

    const pressHandler = isSingleVenue
      ? actions.toggleMenu
      : this.goBack.bind(this);

    return (
      <LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.4)', 'transparent']} style={style.iconContainer}>
        <TouchableOpacity onPress={pressHandler} style={style.backLink}>
          <Image
            source={imageIcon}
            style={style.backIcon}
          />
       </TouchableOpacity>
      </LinearGradient>
    );
  }

  renderContent() {
    const {
      msg: {venueDetails: msg},
      venues: {currentVenue: venue}
    } = this.props;

    const isCloseToVenue = radiansToMiles(venue.address.distance) <= 0.1;

    const firstButton = isCloseToVenue
      ? <Button
          className='primary'
          onPress={this.chooseVenue.bind(this)}
          title={msg.chooseVenue}
        />
      : <Button
          className='primary'
          onPress={this.takeToVenue.bind(this)}
          title={msg.takeToVenue}
        />;

    const secondButton = isCloseToVenue
      ? <Text
          onPress={this.takeToVenue.bind(this)}
          style={style.button}
          suppressHighlighting>
          {msg.takeToVenue.toUpperCase()}
        </Text>
      : <Text
          onPress={this.chooseVenue.bind(this)}
          style={style.button}
          suppressHighlighting>
          {msg.chooseVenue.toUpperCase()}
        </Text>;

    return (
      <View style={style.bottomContent}>

        <Text style={[appStyle.h1, {textAlign: 'center'}]}>
          {venue.title}
        </Text>

        <Text style={[appStyle.h2, {textAlign: 'center'}]}>
          {venue.address.name.toUpperCase()}
        </Text>

        <Text style={[appStyle.paragraph, style.description]}>
          {venue.description}
        </Text>

        <View style={style.buttonWrapper}>
          {firstButton}
          {!!venue.phone && (
            <Button
              className='secondary'
              onPress={this.callVenue.bind(this)}
              size='medium'
              title={msg.callVenue}
            />
          )}
          {secondButton}
        </View>

      </View>
    );
  }

  render() {
    const {
      venues: {currentVenue: venue}
    } = this.props;

    return (
      <View style={style.container}>
        <ParallaxView
          backgroundSource={{uri: venue.background}}
          header={this.renderHeader()}
          windowHeight={windowHeight}>
          {this.renderContent()}
        </ParallaxView>
      </View>
    );
  }
}

export default pureRender(VenueDetails, ['app']);
