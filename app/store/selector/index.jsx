
// OCC Repository

export const getOCCRepository = state => state.occRepository || {};

export const getInstanceId = state => getOCCRepository(state).instanceId || '';

export const getAppKey = state => getOCCRepository(state).appKey || '';

export const getAccessToken = state => getOCCRepository(state).accessToken || '';

export const isAuthenticated = state => (getOCCRepository(state).accessToken ? true : false);


// General Repository

export const getUserRepository = state => state.generalRepository || {};
