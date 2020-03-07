import React, { Component, useEffect, useState } from 'react';

import { View, StyleSheet, Image, Text, TouchableOpacity, Button } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';

import SoundPlayer from 'react-native-sound';
import Modal from "react-native-modal";

import { alghoritmRandom, shuffle } from '../utils/alghoritms'



// import { Container } from './styles';

class Game extends Component {

    state = {
        challengeId: 0,
        currentChallenge: { image: '', sound: '', word: '' },
        hits: 0,
        stars: 5,
        list: [],
        showModal: true
    }

    shuffle(array) {
        var ctr = array.length, temp, index;

        while (ctr > 0) {
            index = Math.floor(Math.random() * ctr);
            ctr--;
            temp = array[ctr];
            array[ctr] = array[index];
            array[index] = temp;
        }
        return array;
    }

    componentDidMount(props) {
        console.log(this.props.navigation.state.params)
        if (this.props.challenges.data.length > 0) {
            this.state.list = alghoritmRandom(this.props.challenges.data, this.props.navigation.state.params);
            this.setState({ currentChallenge: this.state.list[0] });
            setTimeout(() => {
                this.setState({ showModal: false })
            }, 2000)
        }
    }


    componentDidUpdate(prevProps, prevState) {
        this.endGame();
        if (prevProps !== this.props) {
            this.setState({ currentChallenge: this.state.list[0] });
        }
    }

    correct = () => {
        let letra = this.props.navigation.state.params.letra
        if (this.state.currentChallenge.word.toUpperCase().startsWith(letra)) {
            this.state.hits++;
            this.hitSound();
        } else {
            this.state.stars--;
        }

        let challengeId = this.state.challengeId + 1;
        this.setState({ currentChallenge: this.state.list[challengeId], challengeId: challengeId });


    }

    wrong = () => {
        const letra = this.props.navigation.state.params.letra
        if (!this.state.currentChallenge.word.toUpperCase().startsWith(letra)) {
            this.state.hits++;
            console.log(this.hits)
            this.hitSound();
        } else {
            this.state.stars--;
        }

        let challengeId = this.state.challengeId + 1;
        this.setState({ currentChallenge: this.state.list[challengeId], challengeId: challengeId });

    }

    endGame() {

        if (this.state.stars === 0) {
            this.props.navigation.navigate('Lose')
        }

        if (this.state.hits === 5) {
            this.props.navigation.navigate('Win', this.props.navigation.state.params)
        }
    }

    showModal = () => {
        this.setState({
            showModal: true
        });
    };

    hideModal = () => {
        this.setState({
            showModal: false
        });
    };


    playerSound() {
        const sound = new SoundPlayer('teste.mp3', SoundPlayer.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('error')
            }

            // console.log(sound.play())
            sound.play();
        });
    }

    hitSound() {
        const sound = new SoundPlayer('yeah.mp3', SoundPlayer.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('error')
            }
            sound.play();
        });
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    };

    alghoritmRamdom

    render() {
        const letra = this.props.navigation.state.params.letra;
        const { showAlert } = this.state;
        return (
            <View style={styles.container}>

                <Modal isVisible={this.state.showModal} backdropOpacity={0.5} animationInTiming={600} animationOutTiming={800}>
                    <View style={styles.modal}>
                        <Image
                            source={require('../assets/images/load.gif')}
                            style={{ width: 100, height: 100 }}
                        />
                        <Text>Carregando jogo...</Text>
                    </View>
                </Modal>

                <Image style={styles.firstCloud} source={require('../assets/images/first-cloud.png')} />
                <Image style={styles.secondCloud} source={require('../assets/images/second-cloud.png')} />
                <Image style={styles.thirdCloud} source={require('../assets/images/third-cloud.png')} />
                <Image style={styles.fourthCloud} source={require('../assets/images/fourth-cloud.png')} />

                <View style={styles.containerStars}>
                    <Icon name="star" size={50} color={this.state.stars >= 1 ? "#EFCE4A" : '#808080'} />
                    <Icon name="star" size={50} color={this.state.stars >= 2 ? "#EFCE4A" : '#808080'} />
                    <Icon name="star" size={50} color={this.state.stars >= 3 ? "#EFCE4A" : '#808080'} />
                    <Icon name="star" size={50} color={this.state.stars >= 4 ? "#EFCE4A" : '#808080'} />
                    <Icon name="star" size={50} color={this.state.stars === 5 ? "#EFCE4A" : '#808080'} />
                </View>

                <View style={styles.containerCenter}>
                    <View style={styles.containerLetter}>
                        <Text style={styles.letter}>{letra}</Text>
                        <TouchableOpacity style={styles.sound} onPress={() => this.playerSound()}>
                            <Sound name="sound" size={40} color="#000"></Sound>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerImage}>

                        <Image source={{ uri: this.state.currentChallenge.image }} style={{ height: 100, resizeMode: 'stretch', margin: 5 }} />

                        <TouchableOpacity style={styles.sound} onPress={this.toggleModal}>
                            <Sound name="sound" size={40} color="#000"></Sound>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.containerButtons}>
                    <TouchableOpacity style={styles.buttonRed} onPress={this.wrong}>
                        <Icon name="close" size={50} color="#fff" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonGreen} onPress={this.correct}>
                        <Icon name="check" size={50} color="#fff" />
                    </TouchableOpacity>
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#50B3DD',
    },

    firstCloud: {
        position: "absolute",
        top: -25,
        right: 0,
        bottom: 'auto',
        left: 'auto',
    },

    secondCloud: {
        position: "absolute",
        top: 90,
        bottom: 'auto',
        left: 0,
        right: 'auto'
    },

    thirdCloud: {
        position: "absolute",
        right: 0,
        left: 'auto',
        bottom: 60
    },

    fourthCloud: {
        position: "absolute",
        left: 0,
        right: 'auto',
        bottom: 1
    },

    containerStars: {
        flexDirection: 'row',
        marginTop: 20,
        marginLeft: 10,
        marginRight: 10,
        height: 70,
        backgroundColor: '#fff',
        borderRadius: 2,
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 8,
        alignItems: 'center',
        justifyContent: 'space-around'
    },

    containerCenter: {
        flexDirection: 'column',
        marginTop: 50,
        justifyContent: 'center',
        alignSelf: 'center',
    },

    containerLetter: {
        flexDirection: 'row',
        width: 162,
        height: 120,
        backgroundColor: '#fff',
        borderRadius: 150,
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 8,
        borderWidth: 5,
        borderColor: '#86D5FE',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    letter: {
        fontSize: 70,
        fontWeight: 'bold',
        color: '#EFCE4A',
        marginRight: 10,
        alignSelf: 'center'
    },

    sound: {
        alignSelf: 'center',
    },

    containerImage: {
        flexDirection: 'column',
        marginTop: 30,
        width: 248,
        height: 206,
        backgroundColor: '#fff',
        borderRadius: 57,
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 8,
        borderWidth: 5,
        borderColor: '#86D5FE',
        justifyContent: 'center',
        alignSelf: 'center',
    },

    image: {
        height: 100,
        width: 'auto',
        resizeMode: 'stretch',
        alignSelf: 'center',
        marginBottom: 10,
        width: 180,
        height: 101,
    },

    containerButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 24,
    },

    buttonRed: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#FF1919',
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonGreen: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#00C237',
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },

    modal: {
        width: 280,
        height: 200,
        borderRadius: 10,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    }

})

const mapStateToProps = (state) => ({
    challenges: state.challenge
});

export default connect(mapStateToProps)(Game);