const isAuthenticated = (request) => {
  const accessToken = request.headers.get("authorization");
  if (accessToken) return true;
  return false;
};

export default isAuthenticated;