import React, { Component } from 'react';
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { rootSaga } from './api/sagas';
import reducer from './api/reducers';


import Teste from './modules/teste';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, compose(applyMiddleware(sagaMiddleware)), );

class App extends Component {

    render() {
        return (
            <Provider store={store}>
                <Teste />
            </Provider>
        );
    }
}

sagaMiddleware.run(rootSaga);

export default App;