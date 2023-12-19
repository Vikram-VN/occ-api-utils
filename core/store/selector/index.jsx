// OCC Repository

export const getOCCRepository = (state) => state.occRepository || {};

export const getInstanceId = (state) =>
  getOCCRepository(state).instanceId || "";

export const getDeployments = (state) =>
  getOCCRepository(state).deployments || {};

export const getAccessToken = (state) =>
  getOCCRepository(state).accessToken || "";

export const isAuthenticated = (state) =>
  getOCCRepository(state).isLoggedIn || false;

// General Repository

export const getUserRepository = (state) => state.generalRepository || {};
