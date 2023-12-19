"use client";

const appRepository = (state = {}, action) => {
  const { type, key, value } = action;

  let newState = {};

  switch (type) {
    case "updateKeyValue":
      newState = {
        ...state,
        [key]: { ...state[key], ...value },
      };
      break;

    case "removeKeyValue":
      const prevState = { ...state };
      delete prevState[key];
      newState = prevState;
      break;

    case "clearState":
      newState = {};
      break;

    default:
      newState = state;
      break;
  }

  return newState;
};

export default appRepository;
