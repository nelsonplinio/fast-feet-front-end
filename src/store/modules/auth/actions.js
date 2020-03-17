import * as AuthTypes from './types';

export function signInRequest(email, password) {
  return {
    type: AuthTypes.SIGN_IN_REQUEST,
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: AuthTypes.SIGN_IN_SUCCESS,
    payload: { token, user },
  };
}

export function signFailure() {
  return {
    type: AuthTypes.SIGN_FAILURE,
  };
}
