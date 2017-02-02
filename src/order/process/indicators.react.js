import React, {View} from 'react-native';
import styles from './indicators.style';
import pureRender from '@moonjs/react-native-purerender';

class OrderStatusIndicators extends React.Component {

  static propTypes = {
    activePage: React.PropTypes.number,
    style: React.PropTypes.number,
    totalPages: React.PropTypes.number.isRequired
  };

  static defaultPropTypes = {
    activePage: 0
  };

  render() {
    const {activePage, totalPages, style} = this.props;

    let indicators = [];

    for (let i = 0; i < totalPages; i++) {
      indicators.push(
        <View
          key={i}
          style={(i + 1) === activePage ? styles.activeIndicator : styles.indicator}
        />
      );
    }

    return (
      <View style={[style, styles.container]}>
        {indicators}
      </View>
    );
  }

}

export default pureRender(OrderStatusIndicators);
