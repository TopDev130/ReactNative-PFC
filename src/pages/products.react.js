import React, {View, ScrollView, Text} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import ScrollableView from 'react-native-scrollable-tab-view';
import Header from '../components/header.react';
import {trackEvent} from 'Analytics';
import Product from '../products/product.react';
import TabBar from '../products/tabBar.react';
import ListError from '../components/listError.react';

import style from './orders.style';

class Products extends React.Component {

  state = {
    currentTab: 0,
    currentProduct: -1,
    renderedTabs: [0]
  };

  static propTypes = {
    actions: React.PropTypes.object.isRequired,
    app: React.PropTypes.object.isRequired,
    basket: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    navigation: React.PropTypes.object.isRequired,
    onPop: React.PropTypes.func.isRequired,
    products: React.PropTypes.object.isRequired
  };

  onChangeTab({i}) {
    if (this.state.currentTab === i) return;
    this.setState({
      currentTab: i,
      currentProduct: -1,
      renderedTabs: this.state.renderedTabs.concat(i)
    });
  }

  onProductSelected(index) {
    this.setState({
      currentProduct: this.state.currentProduct === index
        ? -1
        : index
    });
  }

  addToBasket(option, product) {
    trackEvent('Added to basket', {
      product: product.title,
      productId: product._id,
      option: option.kind,
      optionId: option._id
    });
    this.props.actions.basket.addToBasket(option, product);
  }

  renderCategory(category, i) {
    const {currentTab, currentProduct} = this.state;
    const {
      basket: {groupedItems: basket}
    } = this.props;

    if (this.state.renderedTabs.indexOf(i) === -1 || category.products.size === 0) {
      return (
        <ScrollView key={i} style={{flex: 1}} tabLabel={category.title}>
          {this.renderEmptyView()}
        </ScrollView>
      );
    }

    return (
      <ScrollView key={i} style={{flex: 1}} tabLabel={category.title}>
        {category.products.map((product, j) =>
          <Product
            basket={basket.get(product._id)}
            isSelected={currentTab === i && currentProduct === j}
            item={product}
            key={j}
            onOptionSelected={option => this.addToBasket(option, product)}
            onSelected={() => this.onProductSelected(j)}
          />
        )}
      </ScrollView>
    );
  }

  renderEmptyView() {
    const {
      msg: {categories: msg}
    } = this.props;

    return (
      <View style={style.emptyList}>
        <Text style={style.emptyListText}>
          {msg.noCategories.toUpperCase()}
        </Text>
      </View>
    );
  }

  render() {
    const {
      navigation,
      products: {currentCategory, currentCategory: {title, categories}, list: {error}}
    } = this.props;

    return (
      <View style={style.container}>

        <Header
          onBackIconClick={() => {
            navigation.pop();
            this.props.onPop();
          }}
          title={title}
          withBorder
        />

        {categories && categories.size === 0 &&
          this.renderCategory(currentCategory, 0)
        }

        {categories && categories.size > 0 && (
          <ScrollableView
            locked
            onChangeTab={this.onChangeTab.bind(this)}
            renderTabBar={() => <TabBar />}>
            {categories.filter(cat => cat.products.size > 0).map(
              this.renderCategory.bind(this)
            )}
          </ScrollableView>
        )}

        {error && error.global && (
          <ListError
            onReload={this.loadMenu.bind(this)}
          />
        )}

      </View>
    );
  }
}

export default pureRender(Products, ['app']);
