import React, {Component} from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import context from './context';

// import { Container } from './styles';

export default class Play extends Component {
    componentDidMount() {
        this.setAsyncStorage();
    }

    async setAsyncStorage() {

        const storageLevels = await AsyncStorage.getItem('levels');
        const letters = await AsyncStorage.getItem('letters');

        if (!storageLevels) {
            var init = { secondLevel: false, thirdLevel: false, fourthLevel: false, fifthLevel: false };
            var contexts = {
                frutas: init,  
                animais: init,
                escola: init,
                casa: init,
            }
            AsyncStorage.setItem('levels', JSON.stringify(contexts))
        }
        
        if (!letters) {
            var lettersContexts = { 'A': false, 'E': false, 'I': false, 'O': false, 'U': false, 'B': false, 'P': false, 'T': false, 'D': false, 'G': false, 'F': false,'S': false,'V': false, 'Z': false, 'X': false, 'L': false, 'M': false, 'N': false, 'R': false, 'J': false, 'H': false, 'Q': false, 'C': false};
            var contexts = {
                frutas: lettersContexts,
                casa: lettersContexts,
                animais: lettersContexts,
                escola: lettersContexts,
                casa: lettersContexts,
            }
            AsyncStorage.setItem('letters', JSON.stringify(contexts))
        }
        console.log(await AsyncStorage.getItem('levels'))
        console.log(await AsyncStorage.getItem('letters'))

        // console.log(await AsyncStorage.getAllKeys())

        
    }



    render(){
        return (
            <View style={styles.container}>
                <Image style={styles.firstCloud} source={require('../assets/images/first-cloud.png')} />
                <Image style={styles.secondCloud}  source={require('../assets/images/second-cloud.png')} />
                <Image style={styles.thirdCloud}  source={require('../assets/images/third-cloud.png')} />
                <Image style={styles.fourthCloud}  source={require('../assets/images/fourth-cloud.png')} />

                <TouchableOpacity style={styles.playButton} onPress={() => this.props.navigation.navigate('Context')}> 
                    <Icon name="play" size={70} color="#49BD36" style={{marginLeft: 5}} />
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#50B3DD',
        alignItems:'center',
        justifyContent:'flex-end',    
    },
    
    playButton: {
        borderWidth:5,
        borderColor:'#86D5FE',
        alignItems:'center',
        justifyContent:'center',
        width:140,
        height:140,
        backgroundColor:'#fff',
        borderRadius:70,
        marginBottom: 78,
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 10,
    },

    firstCloud: {
        marginLeft: 'auto',
        marginBottom: 'auto',
        marginTop: -30,
        position: "relative"
    },

    secondCloud: {
        position: "relative",
        marginRight: "auto",
        marginBottom: -80,
    },

    thirdCloud: {
        position: "relative",
        marginLeft: "auto"
    },

    fourthCloud: {
        position: "relative",
        marginTop:"auto",
        marginRight: "auto",
        marginBottom: -250
    }
});
