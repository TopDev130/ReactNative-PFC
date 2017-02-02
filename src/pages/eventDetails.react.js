import React, {View, Image, Text, TouchableOpacity} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import ParallaxView from '../components/parallaxView.react';
import style, {windowHeight} from './venueDetails.style';
import {dateFormat} from '../intl/store';
import LinearGradient from 'react-native-linear-gradient';

// Styles
import * as appStyle from '../app/app.style';

class EventDetails extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    app: React.PropTypes.object.isRequired,
    events: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired
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

  renderHeader() {

    const imageIcon = require('../../assets/images/small_white_arrow.png');

    return (
      <LinearGradient colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.4)', 'transparent']} style={style.iconContainer}>
        <TouchableOpacity onPress={this.goBack.bind(this)} style={style.backLink}>
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
      events: {currentEvent: event}
    } = this.props;

    return (
      <View style={style.bottomContent}>

        <Text style={[appStyle.h1, {textAlign: 'center'}]}>
          {event.title}
        </Text>

        <Text style={[appStyle.h2, {textAlign: 'center'}]}>
          {dateFormat(event.start, 'Do MMMM H:mmA').toUpperCase()}
        </Text>

        <Text style={[appStyle.paragraph, style.description]}>
          {event.description}
        </Text>

      </View>
    );
  }

  render() {
    const {
      events: {currentEvent: event}
    } = this.props;

    return (
      <View style={style.container}>
        <ParallaxView
          backgroundSource={{uri: event.background}}
          header={this.renderHeader()}
          windowHeight={windowHeight}>
          {this.renderContent()}
        </ParallaxView>
      </View>
    );
  }
}

export default pureRender(EventDetails, ['app']);
