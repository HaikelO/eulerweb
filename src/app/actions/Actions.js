import axios from 'axios';
import { FETCH_ACCOUNT, FETCH_PORT, LOGIN, LOGOUT, FETCH_TEACHERS, NEW_MESSAGE, FETCH_MESSAGES} from './ActionsTypes';
import {URL_SERVER} from './../config/Global';

export function fetchAccount() {
    const request = axios.get(`${URL_SERVER}/api/account`);
    return {
        type: FETCH_ACCOUNT,
        payload: request
    }
}

export function fetchPort() {
    const request = axios.get(`${URL_SERVER}/api/account`);
    return {
        type: FETCH_PORT,
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

export function fetchTeachers() {
    const request = axios.get(`${URL_SERVER}/api/teachers`);
    return {
        type: FETCH_TEACHERS,
        payload: request,
    }
}

export function newMessage(message) {
    return {
        type: NEW_MESSAGE,
        payload: message,
    }
}

export function fetchMessages() {
    const request = axios.get(`${URL_SERVER}/api/messages`);
    return {
        type: FETCH_MESSAGES,
        payload: request,
    }
}