const initialState = {};

const appRepository = (state = initialState, { type, key, value }) => {
    if (type === 'updateKeyValue') {
        return Object.assign({}, state, { [key]: { ...state[key], ...value } });
    } else if (type === 'removeKeyValue') {
        const newState = state;
        delete newState[key];
        return newState;
    }
    else if (type === 'clearState') {
        return {};
    } else {
        return state;
    }
}


export default appRepository;
