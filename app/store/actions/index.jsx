import { call, put, takeEvery } from 'redux-saga/effects';
import httpCall from '../../utils/httpCall';

function* login(action) {
  try {
    const apiRequest = yield call(httpCall, { method: 'post', url: 'login', data: action.payload, headers: {} });
    if (apiRequest.access_token) {
      yield put({ type: 'update', key: "accessToken", value: apiRequest.access })
    }
    yield put({
      type: 'update',
      key: "instanceDetails",
      value: {
        instanceId: action.payload.instanceId,
        appKey: action.payload.appKey
      }
    });

  } catch (e) {
    console.info(e)
  }
}

function* appSaga() {
  yield takeEvery('login', login);
}


export default appSaga;