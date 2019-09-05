import React, { Component } from 'react';
import { StyleSheet , View, ImageBackground, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Feather';
import Icon2 from 'react-native-vector-icons/MaterialIcons';


export default class extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerBack}>
                    <View style={styles.containerView}>
                        <Image source={require("../assets/images/lose.png")} style={{justifyContent: 'flex-start', marginTop: 29}}/>
                        <Image source={require("../assets/images/ghost2.png")} style={{justifyContent: 'center', margin: 20}}/>
                        <View style={styles.containerButtons}>
                            <TouchableOpacity style={styles.btnRed}  onPress={() => alert('Sair')}>
                                <Icon2 name="close" size={50} color="#000"  />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btnGreen} onPress={() => alert('Recomeçar')}>
                                <Icon2 name="replay" size={50} color="#000" />
                            </TouchableOpacity>
                        </View>
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

    containerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 35,
        marginTop: 5
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
        
    },

    btnRed: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#FF1919',
        borderWidth: 5,
        borderColor: '#000',
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 40
    },

    btnGreen: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#49BD36',
        borderWidth: 5,
        borderColor: '#000',
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 40
    },
}) 