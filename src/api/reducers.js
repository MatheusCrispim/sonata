import { combineReducers } from 'redux';
import challengeReducer from './challenge/reducers/reducer';
import contextReducer from './context/reducers/reducer';
import userReducer from './user/reducers/reducer';

export default combineReducers({
    challenge: challengeReducer,
    context: contextReducer,
    user: userReducer,
})