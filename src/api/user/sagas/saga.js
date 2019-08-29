import { takeLatest, all, call, put } from 'redux-saga/effects';
import { Service } from '../../services/service';
import { UserTypes } from '../actions/types';
import { loginSuccess, loginfail, signupSuccess, signupFail, getUserSuccess, login } from '../actions/user.actions';
const { LOGIN, SIGNUP, GET_USER } = UserTypes;

const { get, post } = new Service();
const endpoint = '/users';

export function* rootUserSaga(){
    yield all([
        takeLatest(LOGIN, loginUserSaga),
        takeLatest(SIGNUP, signupUserSaga),
        takeLatest(GET_USER, getUserSaga)
    ]);
}

function* loginUserSaga(action){       
    try{
        let response = yield call(post, endpoint+"/login", action.payload);
    
        if(response.status === 200){
            const { token } = response.data;   
            let payload = { token };
            yield put(loginSuccess(payload));
        }else{
            yield put(loginfail("Credenciais do inválidas"));
        }

    }catch(error){/*Do error handling after*/}
}


function* signupUserSaga(action){
    try{
        let response = yield call(post, endpoint, action.payload);
        
        if(response.status === 201){
            yield put(signupSuccess());
            yield put(login(action.payload));
        }else{
            yield put(signupFail("Usuário já existente"));
        }
        
    }catch(error){/*Do error handling after*/}
}


function* getUserSaga(action){
    try{
        let response = yield call(get, endpoint+'/profile');
        if(response.status === 200 ){
            const { data } = response;
            let payload = {userData: data};
            yield put(getUserSuccess(payload));
        }else{
    
        } 
    }catch(error){/*Do error handling after*/}

}