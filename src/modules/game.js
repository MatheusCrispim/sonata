import React, { Component, useEffect, useState } from 'react';

import { View, StyleSheet, Image, Text, TouchableOpacity, Button } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-vector-icons/AntDesign';
import { connect } from 'react-redux';

import SoundPlayer from 'react-native-sound';
// import SoundPlayer from 'react-native-sound-player'
import Modal from "react-native-modal";

import { alghoritmRandom, shuffle } from '../utils/alghoritms'

import * as data from '../utils/audios.json';

import ProgressBar from 'react-native-progress/Bar';



// import { Container } from './styles';

class Game extends Component {

    state = {
        challengeId: 0,
        currentChallenge: { image: '', sound: '', word: '' },
        hits: 0,
        stars: 5,
        list: [],
        showModal: true,
        showModalError: false,
        wordAudio: '',
        hitsProgress: 0
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
            const listAux = alghoritmRandom(this.props.challenges.data, this.props.navigation.state.params.letra);
            this.setState({ list: listAux })
            
            setTimeout(() => {
                this.setState({ currentChallenge: this.state.list[0] });
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
            this.setState({hitsProgress: (this.state.hits / 10) * 2})
            console.log(this.state.hitsProgress)

            this.hitSound();
        } else {
            this.state.stars--;
            // this.setState({ showModalError: true })
            this.wrongSound()
            // if (this.state.stars >= 1) {
            //     this.setState({ showModalError: true })
            //     setTimeout(async () => {
            //         this.setState({ showModalError: false })
            //     }, 1500)
            // }
        }

        let challengeId = this.state.challengeId + 1;
        this.setState({ currentChallenge: this.state.list[challengeId], challengeId: challengeId });
        word = String(this.state.currentChallenge.word).toLowerCase();
        this.setState({ wordAudio: data[this.props.navigation.state.params.context][word] })
    }

    wrong = () => {
        const letra = this.props.navigation.state.params.letra
        if (!this.state.currentChallenge.word.toUpperCase().startsWith(letra)) {
            this.state.hits++;
            this.setState({hitsProgress: (this.state.hits / 10) * 2})
            console.log(this.state.hitsProgress)
            this.hitSound();
        } else {
            this.state.stars--;
            this.wrongSound();
            // if (this.state.stars < 4) {
            //     this.setState({ showModalError: true })
            //     setTimeout(async () => {
            //         this.setState({ showModalError: false })
            //     }, 1500)
            // }
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
        const letra = String(this.props.navigation.state.params.letra).toLowerCase();
        const path = `letra_${letra}.mp3`;
        console.log(path)
        const sound = new SoundPlayer(path, SoundPlayer.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('error')
            }
            // console.log(sound.play())
            sound.play();
        });
    }

    playerSoundWord() {
        // console.log(this.state.currentChallenge.word)
        // const url = 'https://firebasestorage.googleapis.com/v0/b/sonata-b8bcb.appspot.com/o/Banana.mp3?alt=media&token=83aff6f8-b4bf-4895-a57c-b8e4f30b0e58'
        word = String(this.state.currentChallenge.word).toLowerCase();
        console.log(word)
        const url = data[this.props.navigation.state.params.context][word] ? data[this.props.navigation.state.params.context][word] : null;
        const sound = new SoundPlayer(url, SoundPlayer.MAIN_BUNDLE, (error) => {
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

    wrongSound() {
        const sound = new SoundPlayer('oooh.mp3', SoundPlayer.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('error')
            }
            sound.play();
        });
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    };

    render() {
        const letra = this.props.navigation.state.params.letra;
        const { showAlert } = this.state;
        return (
            <View style={styles.container}>

                <Modal hideModalContentWhileAnimating={true} useNativeDriver={true} isVisible={this.state.showModal} backdropOpacity={0.5} animationInTiming={600} animationOutTiming={800}>
                    <View style={styles.modal}>
                        <Image
                            source={require('../assets/images/load.gif')}
                            style={{ width: 80, height: 80 }}
                        />
                        <Text>Carregando jogo...</Text>
                    </View>
                </Modal>

                <Modal hideModalContentWhileAnimating={true} useNativeDriver={true} isVisible={this.state.showModalError} backdropOpacity={0.5} animationInTiming={300} animationOutTiming={800} onBackdropPress={() => this.setState({ showModalError: false })}>
                    <View style={styles.modalError}>
                        <Image
                            source={require('../assets/images/ghost2.png')}
                            style={{ width: 100, height: 100 }}
                        />
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

                <View style={styles.progress}>
                    <ProgressBar style={styles.progressShadow} progress={this.state.hitsProgress} width={null} height={8} color={'rgba(50, 138, 67, 1)'} unfilledColor={'rgba(255, 255, 255, 1)'} borderColor={'rgba(255, 255, 255, 1)'} borderRadius={0} useNativeDriver={true} />
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

                        <TouchableOpacity style={styles.sound} onPress={() => this.playerSoundWord()} >
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
        // borderRadius: 2,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 2,
        borderTopRightRadius: 2,
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
    },

    modalError: {
        width: 250,
        height: 200,
        borderRadius: 10,
        backgroundColor: '#46C0F8',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center'
    },

    progress: {
        marginLeft: 10,
        marginRight: 10,
    },

    progressShadow: {
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 8,
    }

})

const mapStateToProps = (state) => ({
    challenges: state.challenge
});

export default connect(mapStateToProps)(Game);