export const actions = create();
export const feature = 'app';

export function create(dispatch) {

  return {

    apiError() {},

    toggleMenu() {
      dispatch(actions.toggleMenu);
    },

    updatePosition({coords}) {
      dispatch(actions.updatePosition, coords);
    },

    changeStatusBarStyle(style = 'default') {
      dispatch(actions.changeStatusBarStyle, style);
    },

    toggleStatusBar() {
      dispatch(actions.toggleStatusBar);
    },

    hideStatusBar() {
      dispatch(actions.hideStatusBar);
    },

    showBasketBar() {
      dispatch(actions.showBasketBar);
    },

    hideBasketBar() {
      dispatch(actions.hideBasketBar);
    },

    showStatusBar() {
      dispatch(actions.showStatusBar);
    }

  };

}
