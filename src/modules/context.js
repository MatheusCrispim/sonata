import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

// import { Container } from './styles';

export default class Context extends Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerTitle}>
                    <Text style={styles.title}>Escolha onde você quer jogar ?</Text>
                </View>
                <View style={styles.firstLine}>
                    <TouchableOpacity style={{marginRight: 'auto'}} onPress={() => this.props.navigation.navigate('Letters')}>
                        <View style={styles.firstSquary}>
                            <Text>Animais</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 'auto'}} onPress={() => this.props.navigation.navigate('Letters')}>
                        <View style={styles.secondSquary}>
                            <Text>Casa</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.secondLine}>
                    <TouchableOpacity style={{marginRight: 'auto'}} onPress={() => alert('Escola')}>
                        <View style={styles.thirdSquary}>
                            <Text>Escola</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginLeft: 'auto'}} onPress={() => alert('Frutas')}>
                        <View style={styles.fourthSquare}>
                            <Text>Frutas</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#50B3DD',
        justifyContent: 'center',
    },

    containerTitle: {
        alignItems: 'center',
        marginBottom: 30,
    },

    title: {
        fontSize: 35,
        color: '#fff',
        fontWeight: 'bold',
        marginHorizontal: 20,
        textAlign: 'center',
    },

    firstLine: {
        flexDirection: "row",
        margin: 20,
    },

    secondLine: {
        flexDirection: "row",
        margin: 20,
    },

    firstSquary: {
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 5,
        borderColor: '#86D5FE',
        width: 140,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },

    secondSquary: {
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 5,
        borderColor: '#86D5FE',
        width: 140,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },

    thirdSquary: {
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 5,
        borderColor: '#86D5FE',
        width: 140,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center'
    },

    fourthSquare: {
        borderRadius: 20,
        backgroundColor: '#fff',
        borderWidth: 5,
        borderColor: '#86D5FE',
        width: 140,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center'
    }


})
