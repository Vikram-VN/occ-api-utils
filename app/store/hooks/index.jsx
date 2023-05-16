import { useContext } from 'react';
import { isAuthenticated, getAccessToken } from '../selector';
import { StoreContext } from '../context';
import { useSelector } from 'react-redux';

export const useLoginStatus = () => {
    const { getState } = useContext(StoreContext);
    const isLoggedIn = isAuthenticated(useSelector(getState));
    return isLoggedIn;
}

export const useAccessToken = () => {
    const { getState } = useContext(StoreContext);
    const accessToken = getAccessToken(useSelector(getState));
    return accessToken;
}