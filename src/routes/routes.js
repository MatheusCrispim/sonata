import { createStackNavigator, createAppContainer } from 'react-navigation';

import Play from '../modules/play'
import Teste from '../modules/teste'
import Context from '../modules/context'
import Game from '../modules/game'
import Letters from '../modules/letters'
import Win from '../modules/win'
import Lose from '../modules/lose'

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
    },

    Game: {
        screen: Game,
        navigationOptions: {
            headerTransparent: true,
            headerTintColor: '#ffffff'
        },
    },

    Letters: {
        screen: Letters,
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#04A1E3'
            },
            headerTintColor: '#ffffff',
        },
    },

    Win: {
        screen: Win,
        navigationOptions: {
            headerLeft: null,
            headerTransparent: true
        },
    },

    Lose: {
        screen: Lose,
        navigationOptions: {
            headerLeft: null,
            headerTransparent: true
        },
    }
},{
    headerLayoutPreset: 'center'
});

const Routes = createAppContainer(Root);

export default Routes;
