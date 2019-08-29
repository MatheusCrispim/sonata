import { all } from 'redux-saga/effects';
import { rootChallengeSaga } from './challenge/sagas/saga';
import { rootContextSaga } from './context/sagas/saga';
import { rootUserSaga } from './user/sagas/saga';

export function* rootSaga() {
    yield all([
        rootContextSaga(),
        rootChallengeSaga(),
        rootUserSaga()
    ])
}