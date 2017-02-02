import React, {View, Text, Image} from 'react-native';
import pureRender from '@moonjs/react-native-purerender';
import Card from './card';
import {format} from '../intl/store';
import style from './cardRow.style';
import * as Row from '../components/row.react';

class CardListRow extends React.Component {

  static propTypes = {
    card: React.PropTypes.instanceOf(Card).isRequired,
    msg: React.PropTypes.object.isRequired,
    onSelected: React.PropTypes.func
  };

  static defaultProps = {
    onSelected: () => {}
  };

  iconMappings = {
    'Visa': require('../../assets/images/cards/Visa.png'),
    'American Express': require('../../assets/images/cards/Amex.png'),
    'MasterCard': require('../../assets/images/cards/Mastercard.png'),
    'Discover': require('../../assets/images/cards/Discover.png'),
    'Default': require('../../assets/images/cards/Card.png')
  };

  getIconForBrand(brand) {
    return this.iconMappings[brand] || this.iconMappings.Default;
  }

  render() {
    const {card, onSelected, msg} = this.props;

    return (
      <Row.Container onSelected={onSelected}>
        <View>
          <Image
            source={this.getIconForBrand(card.brand)}
            style={style.cardIcon}
          />
        </View>
        <Row.LeftColumn>
          <Text type='rowSubtext'>
            {card.name ? `${card.name} - ` : ''}
            {format(msg.cardNumber, card)}
          </Text>
        </Row.LeftColumn>
        <Row.RightColumn>
          {card.isDefault && (
            <Image
              source={require('../../assets/images/checkmark.png')}
              style={{width: 20, height: 20}}
            />
          )}
        </Row.RightColumn>
      </Row.Container>
    );
  }

}

export default pureRender(CardListRow);
