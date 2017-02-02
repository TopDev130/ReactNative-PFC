export const actions = create();
export const feature = 'basket';

export function create(dispatch, api) {

  return {

    addToBasket(option, product) {
      dispatch(actions.addToBasket, {option, product});
    },

    removeFromBasket(option) {
      dispatch(actions.removeFromBasket, {option});
    }

  };

}
