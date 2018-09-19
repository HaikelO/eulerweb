import axios from 'axios';
import { FETCH_ACCOUNT, LOGIN, LOGOUT } from './ActionsTypes';
import {URL_SERVER} from './../config/Global';

export function fetchAccount() {
    const request = axios.get(`${URL_SERVER}/api/account`);
    return {
        type: FETCH_ACCOUNT,
        payload: request
    }
}

export function logIn(info) {
    const request = axios.post(`${URL_SERVER}/api/login`, info);
    return {
        type: LOGIN,
        payload: request,
    }
}

export function logOut() {
    const request = axios.post('/api/logout');
    return {
        type: LOGOUT,
        payload: request,
    }
}