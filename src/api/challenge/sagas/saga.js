import { takeLatest, all, call, put, select } from 'redux-saga/effects';
import { Service } from '../../services/service';
import { ChallengeTypes } from '../actions/types';
import { challengeSuccess, challengeFail } from '../actions/actions';

const { get, post, update, del } = new Service();
const endpoint = '/challenges';

const { GET_CHALLENGE,
        GET_CONTEXT_CHALLENGES,
        REGISTER_CHALLENGE,
        UPDATE_CHALLENGE,
        DELETE_CHALLENGE
    } = ChallengeTypes;


export function* rootChallengeSaga(){
    yield all([
        takeLatest(GET_CHALLENGE, getChallengeSaga),
        takeLatest(GET_CONTEXT_CHALLENGES, getContextChallengesSaga),
        takeLatest(REGISTER_CHALLENGE, registerChallengeSaga),
        takeLatest(UPDATE_CHALLENGE, updateChallengeSaga),
        takeLatest(DELETE_CHALLENGE, deleteChallengeSaga)
    ]);
}


function* getChallengeSaga(action){
    try{
        let response = yield call(get, endpoint);
        if(response.status === 200){
            let payload = {data: response.data};
            yield put(challengeSuccess(payload));
        }else{
            let payload = {};
            yield put(challengeFail(payload));
        }

    }catch(error){}
}


function* getContextChallengesSaga(action){
    try{
        let id = action.payload;
        let response = yield call(get, `${endpoint}/${id}/context`);

        if(response.status === 200){
            let payload = {data: response.data};
            yield put(challengeSuccess(payload));
        }else{
            let payload = {data: response.data};
            yield put(challengeFail(payload));
        }
    }catch(error){}
}


function* registerChallengeSaga(action){
    try{
        let data = yield select(state => state.challenge.data);
        let response = yield call(post, endpoint, action.payload);
        let contextId = response.data.id;

        if(response.status === 201){
            let response = yield call(get, `${endpoint}/${contextId}`);

            data.unshift(response.data);
            let payload = {data};
            yield put(challengeSuccess(payload));
        }else{
            let payload = {data};
            yield put(challengeFail(payload));
        }
    }catch(error){}
}


function* updateChallengeSaga(action){
    try{
        let data = yield select(state => state.challenge.data)    
        let response = yield call(update, `${endpoint}/${action.payload.id}`, action.payload.data);
        let contextId = response.data.id;

        if(response.status === 200){
            let response = yield call(get, `${endpoint}/${contextId}`);

            let index = data.findIndex(item=> action.payload.id === item.id);
            data.splice(index, 1, response.data);

            let payload = {data};
            yield put(challengeSuccess(payload));
        }else{
            let payload = {data};
            yield put(challengeFail(payload));
        }

    }catch(error){}
}


function* deleteChallengeSaga(action){
    try{
        let data = yield select(state => state.challenge.data)    
        let response =yield call(del, `${endpoint}/${action.payload}`);

        if(response.status === 200){
            let index = data.findIndex(item=> action.payload === item.id);
            data.splice(index, 1);

            let payload = {data};
            yield put(challengeSuccess(payload));
        }else{
            let payload = {data};
            yield put(challengeFail(payload));
        }

    }catch(error){}
}