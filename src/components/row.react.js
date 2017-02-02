/* eslint-disable react/no-multi-comp */
import React, {View, Text, TouchableOpacity} from 'react-native';
import group from 'lodash.groupby';
import style from './row.style';
import colors from '../colors';

export class Container extends React.Component {

  static propTypes = {
    children: React.PropTypes.node.isRequired,
    containerStyle: React.PropTypes.any,
    onLayout: React.PropTypes.func,
    onSelected: React.PropTypes.func,
    style: React.PropTypes.any
  };

  render() {
    const Container = this.props.onSelected
      ? TouchableOpacity
      : View;

    return (
      <View style={[style.rowContainer, this.props.style]}>
        <Container
          onLayout={this.props.onLayout}
          onPress={_ => this.props.onSelected()}
          style={[style.row, this.props.containerStyle]}>
          {this.props.children}
        </Container>
      </View>
    );
  }
}

export class Info extends React.Component {

  static propTypes = {
    children: React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string]),
    style: React.PropTypes.oneOfType([React.PropTypes.object, React.PropTypes.number]),
    type: React.PropTypes.string
  };

  static defaultProps = {
    type: 'secondary',
    style: {}
  };

  render() {
    const textStyle = {
      ...style.rowDate,
      color: colors.types[this.props.type]
    };

    // If an array of components, use View
    if (Array.isArray(this.props.children)) {
      return (
        <View style={this.props.style}>
          {this.props.children.map(
            (el, key) => React.cloneElement(el, {key, style: textStyle})
          )}
        </View>
      );
    }

    return <Text style={textStyle}>{this.props.children}</Text>;
  }
}

export class LeftColumn extends React.Component {

  static propTypes = {
    children: React.PropTypes.any.isRequired,
    rowInfo: React.PropTypes.object
  };

  render() {
    const children = group(
      (Array.isArray(this.props.children)
        ? this.props.children
        : [this.props.children]
      ).filter(comp => comp),
      comp => comp.type === Info ? 'info' : 'body'
    );

    const bodyType = children.body ? children.body[0].props.type : 'rowText';

    return (
      <View>
        {children.info && (
          <View style={style.rowInfo}>
            {children.info}
          </View>
        )}
        {children.body && React.cloneElement(
          children.body[0],
          {style: style[bodyType]}
        )}
      </View>
    );
  }
}

export class RightColumn extends React.Component {

  static propTypes = {
    children: React.PropTypes.any
  };

  render() {
    return (
      <View style={{flex: 1, alignSelf: 'center'}}>
        <View style={{alignSelf: 'flex-end'}}>
          {this.props.children}
        </View>
      </View>
    );
  }
}
