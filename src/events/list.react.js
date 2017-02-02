import React, {ListView} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import EventRow from './row.react';
import RefreshListView from '../components/refreshList.react';

const simpleComparator = (r1, r2) => r1 !== r2;

class EventList extends React.Component {

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

  render() {
    const dataSource = this.dataStore.cloneWithRows(this.props.items.toArray());

    return (
      <RefreshListView
        automaticallyAdjustContentInsets={false}
        dataSource={dataSource}
        onRefresh={this.props.onRefresh}
        renderRow={event => <EventRow event={event} onSelected={_ => this.props.onSelected(event)} />}
        renderSectionHeader={this.renderSectionHeader}
        style={{marginTop: -40}}
      />
    );

  }

}

export default pureRender(EventList);
