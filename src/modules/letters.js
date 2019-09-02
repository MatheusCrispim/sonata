import React, { Component } from 'react';

import { View, StyleSheet, ScrollView, Text, TouchableOpacity } from 'react-native';

// import { Container } from './styles';

export default class Letters extends Component {

    static navigationOptions = {
        headerTitleStyle: { alignSelf: 'center' },
        title: 'NÍVEL DE JOGO',
    };

    letra = (letra) => {
        this.props.navigation.navigate('Game', letra);
    };

    render() {
        return (
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.blackboard}>
                        <TouchableOpacity style={styles.onePosition} onPress={() => this.letra('A')} >
                            <Text style={styles.letter}>a</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondPosition} onPress={() => this.letra('E')}>
                            <Text style={styles.letter}>e</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.thirdPosition} onPress={() => this.letra('I')}>
                            <Text style={styles.letter}>i</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourthPosition} onPress={() => this.letra('O')}>
                            <Text style={styles.letter}>o</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fifthPosition} onPress={() => this.letra('U')}>
                            <Text style={styles.letter}>u</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.blackboard}>
                        <TouchableOpacity style={styles.onePosition} >
                            <Text style={styles.letter}>b</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondPosition}>
                            <Text style={styles.letter}>p</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.thirdPosition}>
                            <Text style={styles.letter}>t</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourthPosition}>
                            <Text style={styles.letter}>d</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fifthPosition}>
                            <Text style={styles.letter}>g</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.blackboard}>
                        <TouchableOpacity style={styles.onePosition} >
                            <Text style={styles.letter}>f</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondPosition}>
                            <Text style={styles.letter}>s</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.thirdPosition}>
                            <Text style={styles.letter}>v</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourthPosition}>
                            <Text style={styles.letter}>z</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fifthPosition}>
                            <Text style={styles.letter}>x</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.blackboard}>
                        <TouchableOpacity style={styles.onePosition} >
                            <Text style={styles.letter}>m</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondPosition}>
                            <Text style={styles.letter}>n</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.thirdPosition}>
                            <Text style={styles.letter}>r</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourthPosition}>
                            <Text style={styles.letter}>l</Text>
                        </TouchableOpacity>
                        
                    </View>
                    <View style={styles.blackboard}>
                        <TouchableOpacity style={styles.onePosition} >
                            <Text style={styles.letter}>h</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondPosition}>
                            <Text style={styles.letter}>j</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourthPosition}>
                            <Text style={styles.letter}>q</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fifthPosition}>
                            <Text style={styles.letter}>c</Text>
                        </TouchableOpacity>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#50B3DD',
        justifyContent: 'center',
    },

    scrollView: {
        height: 1250,
        // justifyContent: 'center',
        alignItems: 'center',
        margin: 55,
    },

    blackboard: {
        flexDirection: 'row',
        width: 248,
        height: 170.5,
        backgroundColor: '#658A5D',
        borderColor: '#5C2E00',
        borderWidth: 5,
        marginBottom: 67.5,
        padding: 29,
    },

    letter: {
        fontSize: 36,
        fontWeight: 'normal',
        color: '#fff'
    },

    onePosition: {
        marginTop: 60,        
    },

    secondPosition: {
        marginLeft: 20,        
    },

    thirdPosition: {
        marginLeft: 30,
        marginTop: 70        
    },

    fourthPosition: {
        marginLeft: 40,
        marginTop: -20        
    },

    fifthPosition: {
        marginTop: 75,
        marginLeft: 10
    }

})
