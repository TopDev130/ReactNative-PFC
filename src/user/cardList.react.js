import React, {ListView} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import SectionHeader from '../components/sectionHeader.react';
import CardRow from './cardRow.react';

const simpleComparator = (r1, r2) => r1 !== r2;

class CardList extends React.Component {

  static propTypes = {
    items: React.PropTypes.object.isRequired,
    msg: React.PropTypes.object.isRequired,
    onSelected: React.PropTypes.func
  };

  static defaultProps = {
    onSelected: () => {}
  };

  dataStore = new ListView.DataSource({
    sectionHeaderHasChanged: simpleComparator,
    rowHasChanged: simpleComparator
  });

  renderSectionHeader(_, sectionName) {
    const {msg} = this.props;
    return (
      <SectionHeader
        title={msg.sectionName}
        withBorder
      />
    );
  }

  render() {
    const {items, msg} = this.props;
    const dataSource = this.dataStore.cloneWithRows(items.toArray());

    return (
      <ListView
        automaticallyAdjustContentInsets={false}
        dataSource={dataSource}
        renderRow={card =>
          <CardRow
            card={card}
            msg={msg.row}
            onSelected={() => this.props.onSelected(card)}
          />
        }
        renderSectionHeader={this.renderSectionHeader.bind(this)}
      />
    );

  }

}

export default pureRender(CardList);
