import pureRender from '@moonjs/react-native-purerender';
import {Map} from 'immutable';
import React, {
  View,
  Text,
  Animated,
  Dimensions
} from 'react-native';
import {currency} from '../intl/store';
import ProductOptions from './productOptions.react';
import * as Row from '../components/row.react';
import style from './product.style';

const window = Dimensions.get('window');

class Product extends React.Component {

  // wait for https://github.com/facebook/react-native/issues/1234
  state = {
    height: 0,
    width: 0,
    left: new Animated.Value(window.width),
    renderOptions: false
  };

  static propTypes = {
    basket: React.PropTypes.object,
    isSelected: React.PropTypes.bool,
    item: React.PropTypes.object.isRequired,
    onOptionSelected: React.PropTypes.func,
    onSelected: React.PropTypes.func
  };

  static defaultProps = {
    basket: Map(),
    onSelected: () => {},
    onOptionSelected: () => {}
  };

  /*
   * When this component recives props, update internal state to render
   * options component just before animating it to speed up preformance
   * on large lists
   */
  componentWillReceiveProps(props) {
    if (props.isSelected === this.props.isSelected) return;

    if (props.isSelected) {
      this.setState({renderOptions: true}, this.animateInOptions.bind(this));
    } else {
      this.animateOutOptions(() => {
        this.setState({renderOptions: false});
      });
    }
  }

  /*
   * Animate in component and optionally execute callback on animation end
   */
  animateInOptions(cb) {
    Animated
      .timing(this.state.left, {
        toValue: 0,
        duration: 200
      })
      .start(cb);
  }

  /*
   * Animate out component and execute callback on end
   */
  animateOutOptions(cb) {
    Animated
      .timing(this.state.left, {
        toValue: window.width,
        duration: 200
      })
      .start(cb);
  }

  onLayout = ({nativeEvent: {layout: {height, width}}}) => {
    if (!this.state.width) {
      this.setState({width, height});
    }
  };

  /*
   * On row selected handler - fires when user taps on a product row
   *
   * If row is selected, we return from here since selected rows have
   * options indicator and user can only toggle it by tapping on the back button
   *
   * Otherwise, we check if options count is bigger than 0 and if yes, we render product
   * options.
   *
   * If none of the above matches, we select first option (and likely the only one) as
   * selected
   */
  onRowSelectedHandler = () => {
    const {item: {options}} = this.props;

    if (this.state.renderOptions) {
      return;
    }

    if (options.count() > 1) {
      return this.props.onSelected();
    }

    this.props.onOptionSelected(options.first());
  };

  renderRow() {
    const {item, item: {options}} = this.props;

    let pricing = currency(options.first().price, 0);

    if (item.options.count() > 1) {
      pricing += ' / ' + currency(options.last().price);
    }

    return (
      <View style={style.rowContainer}>
        <View style={style.rowTop}>
          <View style={{flex: 1, paddingRight: 20}}>
            <Row.Info type='dark'>{item.title.toUpperCase()}</Row.Info>
          </View>
          <View style={{paddingLeft: 20}}>
            <Row.Info type='dark'>{pricing}</Row.Info>
          </View>
        </View>
        <Text style={style.rowDescription}>{item.description}</Text>
      </View>
    );
  }

  render() {
    const {basket, item: {options}} = this.props;

    const containerStyle = basket.size > 0 ? style.productInBasket : null;

    return (
      <View>
        <Row.Container
          containerStyle={containerStyle}
          onLayout={this.onLayout}
          onSelected={this.onRowSelectedHandler}>
          {this.renderRow()}
        </Row.Container>

        {this.state.renderOptions && (
          <ProductOptions
            basket={basket}
            height={this.state.height}
            onBackArrowPress={this.props.onSelected}
            onOptionSelected={this.props.onOptionSelected}
            options={options}
            style={{left: this.state.left}}
            width={this.state.width}
          />
        )}
      </View>
    );
  }

}

export default pureRender(Product);
