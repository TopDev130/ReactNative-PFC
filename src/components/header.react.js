import pureRender from '@moonjs/react-native-purerender';
import React, {View, Text, TouchableHighlight, Image} from 'react-native';
import {navbar, navbarDark, navbarIcon, big, bigLight} from './header.style';

class Header extends React.Component {

  static propTypes = {
    iconStyle: React.PropTypes.object,
    onBackIconClick: React.PropTypes.func,
    onMenuIconClick: React.PropTypes.func,
    onRightIconClick: React.PropTypes.func,
    rightIconSource: React.PropTypes.number,
    style: React.PropTypes.any,
    title: React.PropTypes.string,
    type: React.PropTypes.string,
    withBorder: React.PropTypes.bool
  };

  static defaultProps = {
    withBorder: false,
    type: 'navbar',
    iconStyle: {}
  };

  _getButtonStyle(type) {
    switch (type) {
      case 'big':
        return big;
      case 'big-light':
        return bigLight;
      case 'navbar-icon':
        return navbarIcon;
      case 'navbar-dark':
        return navbarDark;
      default:
        return navbar;
    }
  }

  render() {
    const {
      title,
      type,
      rightIconSource,
      onRightIconClick,
      onMenuIconClick,
      onBackIconClick
    } = this.props;

    const style = this._getButtonStyle(type);

    // Custom Header style (when border is specified)
    let headerStyle = [style.header];
    if (this.props.withBorder) headerStyle.push(style.headerBorder);

    const backIcon = type === 'navbar-dark'
      ? require('../../assets/images/small_white_arrow.png')
      : require('../../assets/images/small_black_arrow.png');

    return (
      <View style={[headerStyle, this.props.style]}>

        {onBackIconClick && (
          <TouchableHighlight
            onPress={onBackIconClick}
            style={style.backLink}
            underlayColor={'transparent'}>
            <Image
              source={backIcon}
              style={[style.backIcon, this.props.iconStyle]}
            />
          </TouchableHighlight>
        )}

        {onMenuIconClick && (
          <TouchableHighlight
            onPress={onMenuIconClick}
            style={style.menuLink}
            underlayColor={'transparent'}>
            <Image
              source={require('../../assets/images/menu.png')}
              style={[style.menuIcon, this.props.iconStyle]}
            />
          </TouchableHighlight>
        )}

        {title && (
          <Text style={style.heading}>
            {[navbar, navbarIcon, navbarDark].indexOf(style) >= 0 ? title.toUpperCase() : title}
          </Text>
        )}

        {rightIconSource && onRightIconClick && (
          <TouchableHighlight
            onPress={onRightIconClick}
            style={style.forwardLink}
            underlayColor={'transparent'}>
            <Image
              source={rightIconSource}
              style={[style.forwardIcon, this.props.iconStyle]}
            />
          </TouchableHighlight>
        )}

      </View>
    );
  }

}

export default pureRender(Header);
