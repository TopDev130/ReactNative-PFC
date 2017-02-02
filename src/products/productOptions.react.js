import pureRender from '@moonjs/react-native-purerender';
import {Map} from 'immutable';
import React, {
  View,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Text,
  Animated
} from 'react-native';
import {currency} from '../intl/store';
import style from './productOptions.style';

class ProductOptions extends React.Component {
  static propTypes = {
    basket: React.PropTypes.object,
    height: React.PropTypes.number,
    onBackArrowPress: React.PropTypes.func,
    onOptionSelected: React.PropTypes.func,
    options: React.PropTypes.object.isRequired,
    style: React.PropTypes.object,
    width: React.PropTypes.number
  };

  static defaultProps = {
    basket: Map(),
    onBackArrowPress: () => {},
    onOptionSelected: () => {}
  };

  onBackArrowPress() {
    this.props.onBackArrowPress();
    this.scrollView.scrollTo({x: 0, y: 0, animated: true});
  }

  render() {
    const {
      options,
      basket,
      onOptionSelected,
      width,
      height,
      style: passedStyle
    } = this.props;

    const backArrow = (
      <TouchableOpacity
        onPress={this.onBackArrowPress.bind(this)}
        style={style.optionBackButton}>
        <Image
          source={require('../../assets/images/slider_arrow_left.png')}
          style={style.optionBackImage}
        />
      </TouchableOpacity>
    );

    const leftGradient = (
      <Image
        source={require('../../assets/images/gradient_from_left.png')}
        style={[style.optionLeftGradient, {height}]}
      />
    );

    const rightGradient = (
      <Image
        source={require('../../assets/images/gradient_from_right.png')}
        style={[style.optionRightGradient, {height}]}
      />
    );

    return (
      <Animated.View style={[style.options, {width, height}, passedStyle]}>
        {backArrow}
        <View style={{flex: 1}}>
          <ScrollView
            bounces={false}
            centerContent
            contentContainerStyle={style.scrollContent}
            directionalLockEnabled
            horizontal
            ref={scroll => void (this.scrollView = scroll)}
            showsHorizontalScrollIndicator={false}>
            {options.map((opt, key) => {
              const quantity = basket.get(opt._id)
                ? `${basket.get(opt._id)}x`
                : '';
              return (
                <TouchableWithoutFeedback key={key} onPress={() => onOptionSelected(opt)}>
                  <View style={style.option}>
                    <Text style={style.optionQuantity}>{quantity}</Text>
                    <Text style={style.optionPrice}>{currency(opt.price)}</Text>
                    <Text style={style.optionKind}>{opt.kind}</Text>
                  </View>
                </TouchableWithoutFeedback>
              );
            })}
          </ScrollView>
          {leftGradient}
          {rightGradient}
        </View>
      </Animated.View>
    );
  }

}

export default pureRender(ProductOptions);
