import React, {DeviceEventEmitter} from 'react-native';
import Beacons from 'react-native-ibeacon';
import throttle from 'lodash.throttle';
import {beacons as config} from '../config';

export default class BeaconsListener extends React.Component {

  static propTypes = {
    activeVenue: React.PropTypes.object,
    onBeaconDiscovered: React.PropTypes.func.isRequired,
    onBeaconLost: React.PropTypes.func.isRequired,
    onLocationError: React.PropTypes.func.isRequired,
    onLocationRequested: React.PropTypes.func.isRequired,
    onLocationUpdated: React.PropTypes.func.isRequired,
    user: React.PropTypes.object.isRequired
  };

  // Register for location updates only
  // when user has already seen location popup
  // check that during initialisation time
  componentDidMount() {
    const {hasSeenLocationPopup} = this.props.user;

    if (!hasSeenLocationPopup) return;

    this.maybeStartListeningForLocationUpdates();
  }

  componentDidUpdate(prevProps) {
    const activeVenue = this.props.activeVenue;
    const prevVenue = prevProps.activeVenue;
    const areVenuesDefined = !!activeVenue && !!prevVenue;

    // Venues are the same if they are defined
    // and beacons list did not change
    const areVenuesSame = areVenuesDefined
      && prevVenue.beacons === activeVenue.beacons;

    const shouldStartListening = this.props.user.hasSeenLocationPopup;

    // Do not do anything if location not yet seen
    if (!shouldStartListening) return;

    this.maybeStartListeningForLocationUpdates();

    // Handle beacons if venues are different
    if (areVenuesSame) return;

    if (prevVenue && prevVenue.hasBeaconsLoaded()) {
      this.stopRangingInVenue(prevVenue);
    }

    if (activeVenue && activeVenue.hasBeaconsLoaded()) {
      this.startRangingInVenue(activeVenue);
    }
  }

  startRangingInVenue(venue) {
    const region = {
      identifier: venue._id,
      uuid: venue.region
    };

    Beacons.startRangingBeaconsInRegion(region);

    this.beaconsSubscription = DeviceEventEmitter.addListener('beaconsDidRange', throttle(this.beaconsDidRange.bind(this), 5000));
  }

  stopRangingInVenue(venue) {
    const region = {
      identifier: venue._id,
      uuid: venue.region
    };

    Beacons.stopRangingBeaconsInRegion(region);

    if (this.beaconsSubscription) {
      this.beaconsSubscription.listener.cancel();
      this.beaconsSubscription.remove();
    }
  }

  // Check location every 2.5 seconds
  // That significantly easier to do than
  // watchPosition that fires ~100 times per second
  // and slows down all the things
  maybeStartListeningForLocationUpdates() {
    if (this._locationWatcher) return;

    const listener = () => navigator.geolocation.getCurrentPosition(
      this.props.onLocationUpdated,
      this.props.onLocationError,
      {
        enableHighAccuracy: false,
        timeout: 20000,
        maximumAge: 1000
      }
    );

    this._locationWatcher = setInterval(listener, 2500);

    listener();
  }

  /**
   * Handle beacon events
   * If event does not belong to current venue or no beacons in range,
   * simply ignore
   * We need to check if venue exists since some events may fire
   * after we cancel the subscription (for instance one)
   * so it's wiser not to parse them anyway
   */
  beaconsDidRange({region, beacons}) {
    const {activeVenue} = this.props;

    if (activeVenue && region.identifier === activeVenue._id) {
      const discoveredBeacon = beacons
        .filter(a => a.accuracy >= 0 && a.accuracy < config.maxRangeInMeters)
        .sort((a, b) => a.accuracy - b.accuracy)[0];

      const foundBeacon = activeVenue.hasBeaconsLoaded() && discoveredBeacon
        ? activeVenue.beacons.find(b => b.isEqualTo(discoveredBeacon))
        : null;

      foundBeacon
        ? this.props.onBeaconDiscovered(foundBeacon)
        : this.props.onBeaconLost();
    }
  }

  render() {
    return null;
  }

}
