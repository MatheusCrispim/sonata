import { createAction } from 'redux-actions'; 
import { ChallengeTypes } from './types';

const { GET_CHALLENGE, 
        REGISTER_CHALLENGE,
        UPDATE_CHALLENGE,
        DELETE_CHALLENGE,
        CHALLENGE_SUCCESS,
        CHALLENGE_FAIL } = ChallengeTypes

export const getChallenge = createAction(GET_CHALLENGE);
export const registerChallenge = createAction(REGISTER_CHALLENGE);
export const updateChallenge = createAction(UPDATE_CHALLENGE);
export const deleteChallenge = createAction(DELETE_CHALLENGE);
export const challengeSuccess = createAction(CHALLENGE_SUCCESS);
export const challengeFail = createAction(CHALLENGE_FAIL);
