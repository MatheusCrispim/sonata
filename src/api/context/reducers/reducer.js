import { handleActions } from 'redux-actions';
import {  ContextTypes  } from '../actions/types';

const { GET_CONTEXT, 
    REGISTER_CONTEXT,
    UPDATE_CONTEXT,
    DELETE_CONTEXT,
    CONTEXT_SUCCESS,
    CONTEXT_FAIL } = ContextTypes;

export default handleActions(
    new Map([
        [
            GET_CONTEXT,
            (state, action)=>({loading: true, data:[...state.data], requested:false, success:false, action:GET_CONTEXT})
        ],
        [
            REGISTER_CONTEXT,
            (state, action)=>({loading: true, data:[...state.data], requested:false, success:false, action:REGISTER_CONTEXT})
        ],
        [
            UPDATE_CONTEXT,
            (state, action)=>({loading: true, data:[...state.data], requested:false, success:false, action:UPDATE_CONTEXT})
        ],        
        [
            DELETE_CONTEXT,
            (state, action)=>({loading: true, data:[...state.data], requested:false, success:false, action:DELETE_CONTEXT})
        ],
        [
            CONTEXT_SUCCESS,
            (state, action)=>({loading: false, data:[...action.payload.data], requested:true, success:true, action:state.action})
        ],
        [
            CONTEXT_FAIL,
            (state, action)=>({loading: false, data:[...action.payload.data], requested:true, success:false, action:state.action})
        ]
    ]),
    {loading: false, data:[], requested:false, success:false, action:''}

);