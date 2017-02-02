import React, {View, Text} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import {grid} from '../app/app.style';
import style from './summary.style';
import {currency} from '../intl/store';

class Summary extends React.Component {

  static propTypes = {
    msg: React.PropTypes.object.isRequired,
    processingFee: React.PropTypes.number.isRequired,
    totalPrice: React.PropTypes.number.isRequired
  };

  render() {
    const {
      totalPrice: goalAmount,
      processingFee,
      msg
    } = this.props;

    const totalAmount = Math.floor((goalAmount + 20) / (1 - 0.029));
    const stripeFee = totalAmount - goalAmount;

    const totalAmountView = (
      <View style={grid.row}>
        <Text style={style.summaryBolded}>
          {msg.total}
        </Text>
        <Text style={style.summaryBolded}>
          {currency(totalAmount)}
        </Text>
      </View>
    );

    return (
      <View style={style.summary}>
        <View style={grid.row}>
          <Text style={style.summaryText}>
            {msg.subTotal}
          </Text>
          <Text style={style.summaryPrice}>
            {currency(goalAmount)}
          </Text>
        </View>
        <View style={[grid.row, style.summaryBorder]}>
          <Text style={style.summaryText}>
            {msg.processingFee}
          </Text>
          <Text style={style.summaryPrice}>
            {currency(stripeFee)}
          </Text>
        </View>
        {totalAmountView}
      </View>
    );
  }

}

export default pureRender(Summary);
