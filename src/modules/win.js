import React, { Component } from 'react';
import { StyleSheet, View, ImageBackground, Image, AsyncStorage } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Feather';
import { verifyLevelCompleted } from '../utils/alghoritms'


export default class extends Component {

    state = {
        letter: "",
        context: "",
    }

    componentDidMount() {
        if (this.props.navigation.state.params.letra && this.props.navigation.state.params.context) {
            this.setState({ context: this.props.navigation.state.params.context, letter: this.props.navigation.state.params.letra })
        }

        this.setWinLetter();

    }


    async setWinLetter() {
        const storage = await AsyncStorage.getItem('letters');
        const letters = JSON.parse(storage);
        // const response = await AsyncStorage.getItem('levels');

        letters[this.state.context][this.state.letter] = true;

        AsyncStorage.setItem('letters', JSON.stringify(letters)).then(() => {
            verifyLevelCompleted(letters, this.state.context)
        })
    }



    returnLetters() {
        this.props.navigation.navigate('Letters', {
            onGoBack: () => this.refresh(),
        });
    }

    refresh() {
        // console.log('volta mzr')
    }

    render() {
        // console.log(this.state)

        return (
            <View style={styles.container}>
                <View style={styles.containerBack}>
                    <View style={styles.containerView}>
                        <Image source={require("../assets/images/congratulations.png")} style={{ justifyContent: 'flex-start', margin: 10 }} />
                        <Image source={require("../assets/images/ghost.png")} style={{ justifyContent: 'center', margin: 10 }} />
                        <TouchableOpacity style={styles.btnArrow} onPress={() => this.returnLetters()}>
                            <Icon name="arrow-left" size={40} color="#fff" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({

    container: {
        width: '100%',
        height: '100%',
        flex: 1,
        backgroundColor: '#50B3DD',
        justifyContent: 'center',
        alignItems: 'center'
    },

    containerView: {
        alignItems: 'center'
    },

    containerBack: {
        width: 299,
        height: 290,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#75D6FF',
        borderColor: '#267191',
        borderWidth: 5,
        borderRadius: 7,
        flexDirection: "column",

    },

    btnArrow: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#49BD36',
        borderWidth: 5,
        borderColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOpacity: 1,
        elevation: 10,

    }
}) 