import React, {View, Image} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import Order from './order';
import * as Row from '../components/row.react';

class ListRow extends React.Component {

  static propTypes = {
    msg: React.PropTypes.object.isRequired,
    onSelected: React.PropTypes.func,
    order: React.PropTypes.instanceOf(Order).isRequired
  };

  static defaultProps = {
    onSelected: () => {}
  };

  render() {
    const {order, onSelected, msg} = this.props;
    const rowText = order.venue.title;

    return (
      <Row.Container onSelected={onSelected}>
        <Row.LeftColumn>
          <Row.Info>{`${order.date}   `}</Row.Info>
          {order.isProcessing() && (
            <Row.Info type='primary'>{msg.inProgress.toUpperCase()}</Row.Info>
          )}
          <View style={{flex: 1}}>
            <Row.Info type='dark'>{rowText}</Row.Info>
          </View>
        </Row.LeftColumn>
        <Row.RightColumn>
          <Image source={require('../../assets/images/lightgrey_next_arrow.png')} />
        </Row.RightColumn>
      </Row.Container>
    );
  }

}

export default pureRender(ListRow);
