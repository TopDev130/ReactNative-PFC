import React, {Text, Image, View, TouchableWithoutFeedback} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import FadeIn from '@moonjs/react-native-fadein';
import Venue from './venue';
import LinearGradient from 'react-native-linear-gradient';
import {distance} from '../intl/store';
import style from './row.style';
import VenueLabel from '../components/venueLabel.react';

class VenueRow extends React.Component {

  static propTypes = {
    onSelected: React.PropTypes.func,
    venue: React.PropTypes.instanceOf(Venue).isRequired
  };

  static defaultProps = {
    onSelected: () => {}
  };

  render() {
    const {venue, onSelected} = this.props;

    const image = <Image source={{uri: venue.background}} style={style.backgroundImage} />;
    const imageDarken = venue.labels.find(item => item.kind === 'danger');

    return (
      <TouchableWithoutFeedback onPress={onSelected}>
        <View style={style.container}>
          <FadeIn image={image}>
            <LinearGradient
              colors={['transparent', 'transparent', '#000000']}
              style={[style.bottomContent, imageDarken ? {paddingTop: 500} : {paddingTop: 150}]} >
              <View style={[style.labels, imageDarken ? {paddingTop: 350} : {}]}>
                {venue.labels
                  .filter(label => label.showOnList)
                  .map((label, key) => <VenueLabel key={key} label={label}/>)}
              </View>
              <View style={{flexDirection: 'row'}}>
                <Text style={style.title}>{venue.title}</Text>
                <Text style={style.distance}>{distance(venue.address.distance)}</Text>
              </View>
            </LinearGradient>
          </FadeIn>
        </View>
      </TouchableWithoutFeedback>
    );
  }

}

export default pureRender(VenueRow);
