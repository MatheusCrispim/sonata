import { createStackNavigator, createAppContainer } from 'react-navigation';

import Play from '../modules/play'
import Teste from '../modules/teste'
import Context from '../modules/context'

const Root = createStackNavigator({
    Home: {
        screen: Play,
        navigationOptions: {
            headerTransparent: true
        },
    },
    Context: {
        screen: Context,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#04A1E3'
            },
            headerTintColor: '#ffffff'
        },
    },
    Teste: {
        screen: Teste,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#04A1E3'
            },
            headerTintColor: '#ffffff'
        },
    }
});

const Routes = createAppContainer(Root);

export default Routes;
