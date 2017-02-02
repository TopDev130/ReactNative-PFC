import {actions as app} from '../app/actions';

export const actions = create();
export const feature = 'help';

export function create(dispatch, api) {

  return {

    getHelpItemsError() {},
    getHelpItemsSuccess() {},
    getHelpItems() {
      dispatch(actions.getHelpItems);

      return api
        .fetch(`faqs`)
        .tap(payload => dispatch(actions.getHelpItemsSuccess, payload))
        .catch(err => {
          dispatch([actions.getHelpItemsError, app.apiError], err);
          throw err;
        });
    },

    openItemDetails(item) {
      dispatch(actions.openItemDetails, item);
    }

  };

}
