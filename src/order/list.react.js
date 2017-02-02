import React, {ListView} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import SectionHeader from '../components/sectionHeader.react';
import RefreshListView from '../components/refreshList.react';
import ListRow from './row.react';
import {format} from '../intl/store';

const simpleComparator = (r1, r2) => r1 !== r2;

class OrderList extends React.Component {

  static propTypes = {
    items: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    onRefresh: React.PropTypes.func,
    onSelected: React.PropTypes.func
  };

  static defaultProps = {
    onRefresh: () => {},
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
    let items = {active: [], past: [], cancelled: []};

    this.props.items.forEach((item, index) => {
      switch (item.status) {
        case 'new':
        case 'processing':
          items.active.push(item);
          break;
        case 'rejected':
        case 'cancelled':
          items.cancelled.push(item);
          break;
        default:
          items.past.push(item);
      }
    });

    return items;
  }

  /**
   * Renders section header
   */
  renderSectionHeader(_, sectionName) {
    const {msg} = this.props;
    const title = format(msg.sectionName, {sectionName});
    return (
      <SectionHeader
        title={title}
        withBorder
      />
    );
  }

  render() {
    const data = this._prepareDataSource();
    const dataSource = this.dataStore.cloneWithRowsAndSections(data);
    const {msg} = this.props;

    return (
      <RefreshListView
        automaticallyAdjustContentInsets={false}
        dataSource={dataSource}
        onRefresh={this.props.onRefresh}
        renderRow={order =>
          <ListRow
            msg={msg.row}
            onSelected={_ => this.props.onSelected(order)}
            order={order}
          />
        }
        renderSectionHeader={this.renderSectionHeader.bind(this)}
      />
    );

  }

}

export default pureRender(OrderList);
