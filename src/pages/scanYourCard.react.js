import React, {View, Text, InteractionManager} from 'react-native';
import animate, {animations} from '../decorators/animation';
import CardView from 'CardScan';
import pureRender from '@moonjs/react-native-purerender';
import Header from '../components/header.react';
import style from './scanYourCard.style.js';

/*
 * Card can page
 * A full-screen popup appearing during the login page
 */
class ScanYourCard extends React.Component {

  /**
   * Because CardView requires a lot of resources to load,
   * we defer its appearance to make the initial animation
   * smoother
   */
  state = {
    isCardViewVisible: false
  };

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired
  };

  /*
   * When this page pops up,
   * ensure the statusbar is hidden
   */
  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({
        isCardViewVisible: true
      });
    });
  }

  onCardScanned(card) {
    this.props.actions.auth.addCardDetails(card);
    setTimeout(_ => {
      this.props.navigation.pop();
    });
  }

  // Render all the things
  render() {
    const {isCardViewVisible} = this.state;
    const {
      msg: {scanYourCard: msg},
      navigation
    } = this.props;

    return (
      <View style={style.container}>

        <Header
          iconStyle={{opacity: 0.4}}
          onBackIconClick={navigation.pop}
          title={msg.title}
          type='big'
        />

        <View style={style.cardContainer}>
          {isCardViewVisible && (
            <CardView
              hideCardIOLogo
              onCardScanned={this.onCardScanned.bind(this)}
              scanInstructions=""
              scannedImageDuration={0}
              style={style.cardView}
            />
          )}
        </View>

        <Text style={style.instructions}>{msg.instructions}</Text>
      </View>
    );
  }

}

export default animate(
  pureRender(ScanYourCard, ['app']),
  {
    animationType: animations.easeInEaseOut,
    stateElement: 'isCardViewVisible'
  }
);
