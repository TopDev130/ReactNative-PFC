import React, {View, Text} from 'react-native';

import style from './sectionHeader.style';

export default class SectionHeader extends React.Component {

  static propTypes = {
    dark: React.PropTypes.bool,
    error: React.PropTypes.object,
    title: React.PropTypes.string,
    withBorder: React.PropTypes.bool
  };

  render() {
    const {title, dark, withBorder, error} = this.props;

    if (error) {
      return (
        <View style={style.errorContainer}>
          <Text style={style.errorHeading}>
            {'Error'.toUpperCase()}
          </Text>
          <Text style={style.errorText}>
            {error}
          </Text>
        </View>
      );
    }

    let containerStyle = [style.container];
    if (withBorder) containerStyle.push(style.containerWithBorder);

    if (!title) return <View />;

    return (
      <View style={containerStyle}>
        <Text style={[style.text, dark && style.textDark]}>
          {title && title.toUpperCase()}
        </Text>
      </View>
    );
  }

}
