import React, {View, InteractionManager, LayoutAnimation} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import {animations} from '../decorators/animation';
import ProgressHUD from '@moonjs/react-native-progresshud';
import ListError from '../components/listError.react';
import VenueDetails from './venueDetails.react';
import {singleVenueId} from '../config';

class VenueLoader extends React.Component {

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    app: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired,
    venues: React.PropTypes.object.isRequired
  };

  componentDidMount() {
    if (!this.props.venues.list) {
      this.loadVenuesByLocation();
    }
  }

  loadVenuesByLocation(force = false, props = this.props) {
    const {
      actions: {venues: actions},
      navigation
    } = props;

    return actions.getVenues({lat: 0, lng: 0})
      .then(() => {
        // To get nice animation in this case when there's no `venues` view
        // simply unshift empty View when venues are loaded
        const routes = navigation.getCurrentRoutes();
        routes.unshift({component: View});
        navigation.immediatelyResetRouteStack(routes);

        const venue = this.props.venues.list
          .find(venue => venue._id === (singleVenueId || venue._id));

        InteractionManager.runAfterInteractions(() => {
          actions.selectVenue(venue);
          actions.chooseVenue(venue, true);
          LayoutAnimation.configureNext(animations.layout.spring);
        });

        return null;
      });
  }

  render() {
    const {
      venues: {isPending, error, currentVenue}
    } = this.props;

    return (
      <View style={{flex: 1}}>

        {currentVenue && (
          <VenueDetails {...this.props} />
        )}

        {error && error.global && (
          <ListError
            onReload={_ => this.loadVenuesByLocation()}
          />
        )}

        <ProgressHUD isVisible={isPending} />

      </View>
    );
  }
}

export default pureRender(VenueLoader, ['app']);
