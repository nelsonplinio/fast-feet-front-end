import { all, takeLatest, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import * as AuthTypes from './types';
import { signInSuccess, signFailure } from './actions';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', { email, password });

    const { token, user } = response.data;

    yield put(signInSuccess(token, user));
    history.push('/order');
  } catch (err) {
    if (err.response && err.response.data) {
      toast.error(err.response.data.error);
    } else {
      toast.error('Não foi possivel realizar login, verifique seus dados.');
    }

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  api.defaults.headers.Authorization = `bearer ${payload.token}`;
}

export function signOut() {
  history.push('/');
}
export default all([
  takeLatest(AuthTypes.SIGN_IN_REQUEST, signIn),
  takeLatest(AuthTypes.SIGN_IN_SUCCESS, setToken),
  takeLatest(AuthTypes.SIGN_OUT, signOut),
]);
