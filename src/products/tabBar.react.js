import React, {Text, TouchableWithoutFeedback, View} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import styles from './tabBar.style';

class ProductTabBar extends React.Component {

  static propTypes = {
    activeTab: React.PropTypes.number,
    containerWidth: React.PropTypes.number,
    goToPage: React.PropTypes.func,
    scrollValue: React.PropTypes.object,
    tabs: React.PropTypes.array
  };

  renderTabOption(name, page) {
    const isTabActive = this.props.activeTab === page;
    const tabStyle = isTabActive ? styles.activeTab : styles.tab;
    const tabTextStyle = isTabActive ? styles.activeTabText : styles.tabText;

    return (
      <TouchableWithoutFeedback key={page} onPress={() => this.props.goToPage(page)}>
        <View style={tabStyle}>
          <Text style={tabTextStyle}>
            {name.toUpperCase()}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    return (
      <View style={styles.tabs}>
        {this.props.tabs.map(this.renderTabOption.bind(this))}
      </View>
    );
  }
}

export default pureRender(ProductTabBar);
