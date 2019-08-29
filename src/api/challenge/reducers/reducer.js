import { handleActions } from 'redux-actions';
import {  ChallengeTypes  } from '../actions/types';

const { 
    GET_CHALLENGE, 
    REGISTER_CHALLENGE,
    UPDATE_CHALLENGE,
    DELETE_CHALLENGE,
    CHALLENGE_SUCCESS,
    CHALLENGE_FAIL } = ChallengeTypes;

export default handleActions(
    new Map([
        [
            GET_CHALLENGE,
            (state, action)=>({loading: true, data:[...state.data], requested:false, success:false, action:GET_CHALLENGE})
        ],
        [
            REGISTER_CHALLENGE,
            (state, action)=>({loading: true, data:[...state.data], requested:false, success:false, action:REGISTER_CHALLENGE})
        ],
        [
            UPDATE_CHALLENGE,
            (state, action)=>({loading: true, data:[...state.data], requested:false, success:false, action:UPDATE_CHALLENGE})
        ],        
        [
            DELETE_CHALLENGE,
            (state, action)=>({loading: true, data:[...state.data], requested:false, success:false, action:DELETE_CHALLENGE})
        ],
        [
            CHALLENGE_SUCCESS,
            (state, action)=>({loading: false, data:[...action.payload.data], requested:true, success:true, action:state.action})
        ],
        [
            CHALLENGE_FAIL,
            (state, action)=>({loading: false, data:[...action.payload.data], requested:true, success:false, action:state.action})
        ]
    ]),
    {loading: false, data:[], action:''}
);