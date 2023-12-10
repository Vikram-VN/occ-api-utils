import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { noop } from "@/utils";
import adminApi, { agentApi } from "@/utils/api";

function* adminApiHandler(action) {
  try {
    const requestEndpoint = action.payload.url || "/";
    const requestMethod = action.payload.method || "get";
    const requestHeaders = action.payload.headers || {
      "content-type": "application/json",
    };
    const newRequest = action.payload.data || "";
    const userNotification = action.payload.showNotification || false;
    const successHandler = action.payload.onSuccess || noop;
    const errorHandler = action.payload.onError || noop;
    const stateAction = action.payload.stateAction || "";
    const stateHandler = action.payload.stateHandler || noop;

    const apiRequest = yield call(adminApi, {
      method: requestMethod,
      url: requestEndpoint,
      data: newRequest,
      headers: requestHeaders,
      onSuccess: successHandler,
      onError: errorHandler,
      showNotification: userNotification,
    });

    const stateUpdate = stateHandler(action.payload.data, apiRequest);

    if (stateUpdate) {
      yield put({ type: stateAction, ...stateUpdate });
    }
  } catch (e) {
    console.info(`API Action Call Error: `, e);
  }
}

function* agentApiHandler(action) {
  try {
    const requestEndpoint = action.payload.url || "/";
    const requestMethod = action.payload.method || "get";
    const requestHeaders = action.payload.headers || {
      "content-type": "application/json",
    };
    const newRequest = action.payload.data || "";
    const userNotification = action.payload.showNotification || false;
    const successHandler = action.payload.onSuccess || noop;
    const errorHandler = action.payload.onError || noop;
    const stateAction = action.payload.stateAction || "";
    const stateHandler = action.payload.stateHandler || noop;

    const apiRequest = yield call(agentApi, {
      method: requestMethod,
      url: requestEndpoint,
      data: newRequest,
      headers: requestHeaders,
      onSuccess: successHandler,
      onError: errorHandler,
      showNotification: userNotification,
    });

    const stateUpdate = stateHandler(action.payload.data, apiRequest);

    if (stateUpdate) {
      yield put({ type: stateAction, ...stateUpdate });
    }
  } catch (e) {
    console.info(`API Action Call Error: `, e);
  }
}

function* sagasHandler(action) {
  try {
    const stateAction = action.payload.stateAction || "updateKeyValue";
    const stateHandler = action.payload.stateHandler || noop;

    const stateUpdate = stateHandler(action.payload.data);

    yield put({ type: stateAction, ...stateUpdate });
  } catch (e) {
    console.info(`State Action Call Error: `, e);
  }
}

function* appSaga() {
  yield takeLatest("adminApiCall", adminApiHandler);
  yield takeLatest("agentApiCall", agentApiHandler);
  yield takeLatest("stateUpdate", sagasHandler);
}

export default appSaga;
