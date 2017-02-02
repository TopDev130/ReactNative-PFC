import pureRender from '@moonjs/react-native-purerender';
import React, {View, ScrollView, Image, ListView, Text} from 'react-native';
import SectionHeader from '../components/sectionHeader.react';
import LinearGradient from 'react-native-linear-gradient';
import style from './categoryList.style';
import {RefreshControl} from '../components/refreshList.react';
import * as Row from '../components/row.react';
import VenueLabel from '../components/venueLabel.react';

const simpleComparator = (r1, r2) => r1 !== r2;

class CategoriesList extends React.Component {

  static propTypes = {
    activeVenue: React.PropTypes.object.isRequired,
    items: React.PropTypes.object.isRequired,
    onSelected: React.PropTypes.func,
    refreshControl: React.PropTypes.node.isRequired
  };

  static defaultProps = {
    onSelected: () => {}
  };

  dataStore = new ListView.DataSource({
    sectionHeaderHasChanged: simpleComparator,
    rowHasChanged: simpleComparator
  });

  renderHeader() {
    const {activeVenue} = this.props;

    return (
      <View style={style.container}>
        <Image source={{uri: activeVenue.background}} style={style.splash} />
        <SectionHeader
          title={'Menu'}
          withBorder
        />
        <LinearGradient
          colors={['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.4)', 'rgba(0, 0, 0, 0.7)']}
          style={style.gradient}>
          <Text style={style.header}>{activeVenue.title}</Text>
          {activeVenue.labels.map((label, key) => label.showOnMenu
            ? <VenueLabel key={key} label={label} />
            : null
          )}
        </LinearGradient>
      </View>
    );
  }

  renderRow(item) {
    const {onSelected} = this.props;

    return (
      <Row.Container onSelected={() => onSelected(item)}>
        <Row.LeftColumn>
          <Text type='rowSubtext'>{item.title.toUpperCase()}</Text>
        </Row.LeftColumn>
        <Row.RightColumn>
          <Image source={require('../../assets/images/lightgrey_next_arrow.png')} />
        </Row.RightColumn>
      </Row.Container>
    );
  }

  render() {
    const dataSource = this.dataStore.cloneWithRows(this.props.items.toArray());

    return (
      <ScrollView refreshControl={this.props.refreshControl} style={{flex: 1}}>
        {this.renderHeader()}
        <ListView
          automaticallyAdjustContentInsets={false}
          dataSource={dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </ScrollView>
    );

  }

}

export default pureRender(RefreshControl(CategoriesList));
