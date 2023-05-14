// Context Repository
export const getAppRepository = state => state.appRepository || {};

// OCC Repository

export const getOCCRepository = state => getAppRepository(state).occRepository || {};

export const getInstanceId = state => getOCCRepository(state).instanceId || {};

export const getAccessToken = state => getOCCRepository(state).accessToken || {};

export const getAppKey = state => getOCCRepository(state).appKey || {};

export const isAuthenticated = state => (getOCCRepository(state).accessToken ? true : false);


// General Repository

export const getUserRepository = state => getAppRepository(state).generalRepository || {};
