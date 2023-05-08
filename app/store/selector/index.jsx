// Context Repository
export const getAppRepository = state => state.appRepository || {};

export const getContext = state => getAppRepository(state).context || {};

export const getSessionContext = state => getContext(state).session || {};

export const getNotifications = state => getAppRepository(state).notifications || {};

export const getRememberMe = state => getSessionContext(state).rememberMe || {};

export const isAuthenticated = state => (getSessionContext(state).token ? true : false);

export const isValidationTokenExpired = state => {
    const validationTokenExpiryTime =
        getSessionContext(state).expires_in || state.expires_in;
    const date = new Date();
    if (validationTokenExpiryTime < date.getTime()) return true;

    return false;
};

// Profile Repository

export const getUserRepository = state => getAppRepository(state).userRepository || {};

export const getProfile = state => getUserRepository(state).profile || {};


// OCC Repository

export const getOCCRepository = state => getAppRepository(state).occRepository || {};

export const getInstanceId = state => getOCCRepository(state).instanceId || {};

export const getAccessToken = state => getOCCRepository(state).accessToken || {};

export const getFiles = state => getOCCRepository(state).files || {};

export const getFile = (state, { name }) => getFiles(state)[name] || {};

export const getOrganizations = state => getOCCRepository(state).organizations || {};

export const getOrganization = (state, { name }) => getOrganizations(state)[name] || {};