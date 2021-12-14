import {all} from 'redux-saga/effects';
import {watchHandleRoute} from './route';

export default function* rootSaga() {
  yield all([watchHandleRoute()]);
}
