import React, {ScrollView, View, Text} from 'react-native';
import Button from '../components/button.react';

import style from './listError.style';

export default class ListError extends React.Component {

  static propTypes = {
    onReload: React.PropTypes.func
  };

  render() {
    const {onReload} = this.props;

    return (
      <ScrollView
        automaticallyAdjustContentInsets={false}
        contentContainerStyle={{flex: 1, margin: 20}}>

        <View style={style.container}>
          <Text style={style.header}>Oops!</Text>
          <Text style={style.message}>
            {'There was an error while loading. \nTry again?'}
          </Text>
        </View>

        {onReload && (
          <Button
            className='primary'
            onPress={onReload}
            title='Reload'
          />
        )}

      </ScrollView>
    );
  }

}
