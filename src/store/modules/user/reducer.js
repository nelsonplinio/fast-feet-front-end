import produce from 'immer';

import * as AuthTypes from '../auth/types';

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case AuthTypes.SIGN_IN_SUCCESS: {
        draft.profile = action.payload.user;
        break;
      }
      default:
    }
  });
}
