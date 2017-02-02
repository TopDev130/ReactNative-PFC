import {LayoutAnimation} from 'react-native';

// Basic animations predefined
export const animations = {
  layout: {
    spring: {
      duration: 500,
      create: {
        duration: 300,
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 200
      }
    },
    easeInEaseOut: {
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY
      },
      update: {
        delay: 100,
        type: LayoutAnimation.Types.easeInEaseOut
      }
    }
  }
};

export default function setupAnimation(Component, {animationType, stateElement}) {

  /**
   * Starts animation on state change
   *
   * @description
   * When `stateElement` is present, we check if layout animation should be performed
   * This allows setting multiple animations that will be invoked depending on the state
   * change
   *
   * @param {Object} props - properties
   * @param {Object} state - state
   */
  Component.prototype.componentWillUpdate = function(props, state) {
    const didStateChange = this.state && this.state[stateElement] !== state[stateElement];
    const didPropsChange = this.props && this.props[stateElement] !== props[stateElement];
    if (!stateElement || didStateChange || didPropsChange) {
      LayoutAnimation.configureNext(animations.layout[animationType]);
    }
  };

  return Component;

}
