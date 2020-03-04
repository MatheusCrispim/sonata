import React, { Component } from 'react';
import { StyleSheet , View, ImageBackground, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Feather';


export default class extends Component {

    returnLetters() {
        this.props.navigation.navigate('Letters');
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerBack}>
                    <View style={styles.containerView}>
                        <Image source={require("../assets/images/congratulations.png")} style={{justifyContent: 'flex-start', margin: 10}}/>
                        <Image source={require("../assets/images/ghost.png")} style={{justifyContent: 'center', margin: 10}}/>
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

    container:{
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