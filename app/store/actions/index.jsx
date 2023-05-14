<<<<<<< HEAD
import { call, put, takeEvery } from 'redux-saga/effects';
import { noop } from '../../utils';
import httpCall from '../../utils/httpCall';

function* apiHandler(action) {
=======
import { put, takeEvery } from 'redux-saga/effects';
import { noop } from '../../utils';
import httpCall from '../../utils/httpCall';

function* sagasHandler(action) {
>>>>>>> 5dde92b (nothing is working)
  try {
    const requestEndpoint = action.payload.url || '/';
    const requestMethod = action.payload.method || 'get';
    const requestHeaders = action.payload.headers || { 'content-type': 'application/json' };
    const newRequest = action.payload.requestData || '';
    const userNotification = action.payload.showNotification || false;
    const successHandler = action.payload.onSuccess || noop;
    const errorHandler = action.payload.onError || noop;
    const stateAction = action.payload.stateAction || '';
    const stateHandler = action.payload.stateHandler || noop;

    const apiRequest = yield call(httpCall, {
      method: requestMethod,
      url: requestEndpoint,
      data: newRequest,
      headers: requestHeaders,
      onSuccess: successHandler,
      onError: errorHandler,
      showNotification: userNotification
    });

    const stateUpdate = stateHandler(action.payload, apiRequest);

    if (stateUpdate) {
      yield put({ type: stateAction, ...stateUpdate });
    }

  } catch (e) {
    console.info(`API Action Call Error: `, e)
  }
}

function* sagasHandler(action) {
  try {

    const stateAction = action.payload.stateAction || '';
    const stateHandler = action.payload.stateHandler || noop;

    const stateUpdate = stateHandler(action.payload);

    yield put({ type: stateAction, ...stateUpdate });

  } catch (e) {
    console.info(`State Action Call Error: `, e)
  }
}

function* appSaga() {
  yield takeEvery('apiCall', apiHandler);
  yield takeEvery('stateCall', sagasHandler);
}


export default appSaga;