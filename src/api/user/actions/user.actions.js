import { createAction } from 'redux-actions'; 
import { UserTypes } from './types';

const { SIGNUP, LOGIN, SIGNUP_SUCCESS, SIGNUP_FAIL, LOGIN_SUCCESS,
     LOGIN_FAIL, GET_USER, GET_USER_SUCCESS, LOGOUT } = UserTypes;

export const signup = createAction(SIGNUP);
export const login = createAction(LOGIN);
export const logout = createAction(LOGOUT);
export const signupSuccess = createAction(SIGNUP_SUCCESS);
export const signupFail = createAction(SIGNUP_FAIL);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginfail = createAction(LOGIN_FAIL);
export const getUser = createAction(GET_USER);
export const getUserSuccess = createAction(GET_USER_SUCCESS);
