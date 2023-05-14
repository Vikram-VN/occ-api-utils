import { put, takeEvery } from 'redux-saga/effects';
import { noop } from '../../utils';
import httpCall from '../../utils/httpCall';

function* sagasHandler(action) {
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

    const apiRequest = httpCall({
      method: requestMethod,
      url: requestEndpoint,
      data: newRequest,
      headers: requestHeaders,
      onSuccess: successHandler,
      onError: errorHandler,
      showNotification: userNotification
    });

    // Need to return key value object from this handler
    const stateUpdate = stateHandler(action.payload, apiRequest);

    yield put({ type: stateAction, ...stateUpdate });

  } catch (e) {
    console.info(`Action Call Error: `, e)
  }
}

function* appSaga() {
  yield takeEvery('*', sagasHandler);
}


export default appSaga;