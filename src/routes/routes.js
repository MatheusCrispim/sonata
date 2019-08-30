import { createStackNavigator, createAppContainer } from 'react-navigation';

import Play from '../modules/play'
import Teste from '../modules/teste'

const Root = createStackNavigator({
    Home: {
        screen: Play,
        navigationOptions: {
            headerTransparent: true
        },
    },
    Teste: {
        screen: Teste
    }
});

const Routes = createAppContainer(Root);

export default Routes;
