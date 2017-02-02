import React, {View, TouchableOpacity, Text} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import {currency} from '../intl/store';
import * as Row from '../components/row.react';
import LinearGradient from 'react-native-linear-gradient';
import style from './item.style';

class BasketItem extends React.Component {

  state = {
    width: null,
    height: null
  };

  static propTypes = {
    displayOptionKind: React.PropTypes.bool,
    isSelected: React.PropTypes.bool,
    item: React.PropTypes.object.isRequired,
    onAddItemPress: React.PropTypes.func.isRequired,
    onRemoveItemPress: React.PropTypes.func.isRequired,
    onSelected: React.PropTypes.func.isRequired
  };

  onLayout({nativeEvent: {layout: {height, width}}}) {
    if (!this.state.width) {
      this.setState({
        width, height
      });
    }
  }

  renderBasketButtons() {
    const {height} = this.state;
    const touchableStyle = {flex: 1, justifyContent: 'center', width: height, height};

    return (
      <View style={style.stockButtons}>
        <View style={style.stockButton}>
          <TouchableOpacity onPress={this.props.onAddItemPress} style={touchableStyle}>
            <Text style={style.stockButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <View style={style.stockButton}>
          <TouchableOpacity onPress={this.props.onRemoveItemPress} style={touchableStyle}>
            <Text style={style.stockButtonText}>-</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const {
      displayOptionKind,
      item: {option, quantity, product},
      isSelected,
      onSelected
    } = this.props;

    const onSelectedHandler = !isSelected ? onSelected : null;

    const colors = [
      'rgba(255, 255, 255, 0.0)',
      'rgba(255, 255, 255, 1)'
    ];

    return (
      <Row.Container
        containerStyle={style.containerStyle}
        onLayout={this.onLayout.bind(this)}
        onSelected={onSelectedHandler}>
        <View style={[style.leftColumn, isSelected && style.columnCollapse]}>
          <Text style={style.quantity}>{quantity}x</Text>
          <Text style={style.heading}>{product.title.toUpperCase()}</Text>
          {displayOptionKind && (
            <Text style={[style.quantity, {marginLeft: 10}]}>
              {option.kind}
            </Text>
          )}
        </View>
        <View style={style.rightColumn}>
          <LinearGradient colors={colors} end={[0.2, 0.5]} start={[0.0, 0.5]} style={style.price}>
            <Text style={style.heading}>{currency(option.price)}</Text>
          </LinearGradient>
          {isSelected && this.renderBasketButtons()}
        </View>
      </Row.Container>
    );
  }

}

export default pureRender(BasketItem);
