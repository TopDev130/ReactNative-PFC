import pureRender from '@moonjs/react-native-purerender';
import React, {ListView, Text, Image} from 'react-native';
import SectionHeader from '../components/sectionHeader.react';
import RefreshListView from '../components/refreshList.react';
import * as Row from '../components/row.react';

const simpleComparator = (r1, r2) => r1 !== r2;

class HelpItemsList extends React.Component {

  static propTypes = {
    items: React.PropTypes.object.isRequired,
    onRefresh: React.PropTypes.func,
    onSelected: React.PropTypes.func
  };

  static defaultProps = {
    onSelected: () => {}
  };

  dataStore = new ListView.DataSource({
    sectionHeaderHasChanged: simpleComparator,
    rowHasChanged: simpleComparator
  });

  /**
   * Prepares data source
   *
   * @description
   * Keys are defined explicitly in order to force
   * specific sections order
   *
   * @returns {Object} items divided into past and active Arrays
   */
  _prepareDataSource() {
    let sections = {};

    this.props.items.forEach((item, index) => {
      if (!Array.isArray(sections[item.section])) {
        sections[item.section] = [];
      }
      sections[item.section].push(item);
    });

    return sections;
  }

  /*
   * Renders section header
   * @returns Section Header Component
   */
  renderSectionHeader(_, sectionName) {
    return (
      <SectionHeader
        title={sectionName}
        withBorder
      />
    );
  }

  renderRow(item) {
    const {onSelected} = this.props;

    return (
      <Row.Container onSelected={() => onSelected(item)}>
        <Row.LeftColumn>
          <Text type='rowSubtext'>{item.title}</Text>
        </Row.LeftColumn>
        <Row.RightColumn>
          <Image source={require('../../assets/images/lightgrey_next_arrow.png')} />
        </Row.RightColumn>
      </Row.Container>
    );
  }

  render() {
    const data = this._prepareDataSource();
    const dataSource = this.dataStore.cloneWithRowsAndSections(data);

    return (
      <RefreshListView
        automaticallyAdjustContentInsets={false}
        dataSource={dataSource}
        onRefresh={this.props.onRefresh}
        renderRow={this.renderRow.bind(this)}
        renderSectionHeader={this.renderSectionHeader.bind(this)}
      />
    );

  }

}

export default pureRender(HelpItemsList);
