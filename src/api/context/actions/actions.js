import { createAction } from 'redux-actions'; 
import { ContextTypes } from './types';

const { GET_CONTEXT, 
        REGISTER_CONTEXT,
        UPDATE_CONTEXT,
        DELETE_CONTEXT,
        CONTEXT_SUCCESS,
        CONTEXT_FAIL } = ContextTypes

export const getContext = createAction(GET_CONTEXT);
export const registerContext = createAction(REGISTER_CONTEXT);
export const updateContext = createAction(UPDATE_CONTEXT);
export const deleteContext = createAction(DELETE_CONTEXT);
export const contextSuccess = createAction(CONTEXT_SUCCESS);
export const contextFail = createAction(CONTEXT_FAIL);
