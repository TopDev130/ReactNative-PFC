import pureRender from '@moonjs/react-native-purerender';
import React, {ScrollView, View, Text, Image} from 'react-native';
import Venue from '../venues/venue';

// Load stylesheets
import styles from './menu.style';
import branding from '../branding';

class Menu extends React.Component {

  static propTypes = {
    activeOrdersCount: React.PropTypes.number.isRequired,
    basketCount: React.PropTypes.number.isRequired,
    menuActions: React.PropTypes.object,
    msg: React.PropTypes.object.isRequired,
    onItemSelected: React.PropTypes.func.isRequired,
    venue: React.PropTypes.instanceOf(Venue)
  };

  /*
   * Render menu
   * Display user profile and links
   */
  render() {
    const {venue, msg, basketCount, onItemSelected, activeOrdersCount} = this.props;

    // See https://github.com/facebook/react-native/issues/4016
    const image = venue
      ? <Image source={{uri: venue.logo}} style={styles.venueLogo} />
      : <Image source={branding.images.logoSmall} style={styles.appLogo} />;

    return (
      <View style={styles.menu}>

        <ScrollView scrollsToTop={false} style={styles.container}>

          <View style={styles.avatarContainer}>
            {image}
          </View>

          {venue && (
            <View style={styles.rowInfo}>
              <Text onPress={_ => onItemSelected('categories')} style={styles.item} suppressHighlighting>
                {msg.categories}
              </Text>

              {basketCount > 0 && (
                <Text style={styles.activeOrdersCounter}>
                  {basketCount}
                </Text>
              )}
            </View>
          )}

          {venue && venue.events.size > 0 && (
            <Text onPress={_ => onItemSelected('events')} style={styles.item} suppressHighlighting>
              {msg.events}
            </Text>
          )}

          <View style={styles.rowInfo}>
            <Text onPress={_ => onItemSelected('orders')} style={styles.item} suppressHighlighting>
              {msg.orders}
            </Text>

            {!!activeOrdersCount && (
              <Text style={styles.activeOrdersCounter}>
                {activeOrdersCount}
              </Text>
            )}
          </View>

          <Text onPress={_ => onItemSelected('venues')} style={styles.item} suppressHighlighting>
            {msg.venues}
          </Text>

          <Text onPress={_ => onItemSelected('profile')} style={styles.item} suppressHighlighting>
            {msg.profile}
          </Text>

          <Text onPress={_ => onItemSelected('help')} style={styles.item} suppressHighlighting>
            {msg.help}
          </Text>

        </ScrollView>

      </View>
    );
  }

}

export default pureRender(Menu);
