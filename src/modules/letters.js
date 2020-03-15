import React, { Component } from 'react';

import { View, StyleSheet, ScrollView, Text, TouchableOpacity, AsyncStorage } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-vector-icons/AntDesign';

import Modal from "react-native-modal";

import SoundPlayer from 'react-native-sound';

const sound = new SoundPlayer('letter_again.mp3', SoundPlayer.MAIN_BUNDLE);

const choiceLetter = new SoundPlayer('choice_letter.mp3', SoundPlayer.MAIN_BUNDLE);

// import { Container } from './styles';

export default class Letters extends Component {

    state = {
        levels: {},
        context: this.props.navigation.state.params,
        showModal: false,
        auxLetter: null
    }

    static navigationOptions = {
        headerTitleStyle: { alignSelf: 'center' },
        title: 'NÍVEIS DO JOGO',
    };

    componentDidUpdate() {
        this.verifyProgress()
    }

    componentDidMount() {
        this.verifyProgress();
        setTimeout(() => {
            this.playSoundChoiceLetter();
        }, 500)
    }

    async verifyProgress() {
        const levels = await AsyncStorage.getItem('levels');
        const levelsContexts = JSON.parse(levels)
        if (levelsContexts) {
            switch (this.state.context) {
                case 'frutas':
                    if (levelsContexts.frutas) {
                        this.setState({ levels: levelsContexts.frutas })
                    }
                    break;
                case 'animais':
                    if (levelsContexts.animais) {
                        this.setState({ levels: levelsContexts.animais })
                    }
                    break;
                case 'escola':
                    if (levelsContexts.escola) {
                        this.setState({ levels: levelsContexts.escola })
                    }
                    break;
                case 'casa':
                    if (levelsContexts.casa) {
                        this.setState({ levels: levelsContexts.casa })
                    }
                    break;

                default:
                    break;
            }
        }
    }

    async letra(letra) {
        const storageLetters = await AsyncStorage.getItem('letters');
        const letters = JSON.parse(storageLetters);
        this.setState({ auxLetter: letra })
        if (letters[this.state.context][letra] === true) {
            this.toggleModal();
            this.playSound()
        } else {
            this.goToGame();
        }
    };

    playSound() {
        sound.play();
    }

    stopSound() {
        sound.stop();
    }

    playSoundChoiceLetter() {
        choiceLetter.play();
    }

    stopSoundChoiceLetter() {
        choiceLetter.stop();
    }

    goToGame() {
        this.setState({ showModal: false })
        this.stopSound();
        this.stopSoundChoiceLetter();
        const params = { letra: this.state.auxLetter, context: this.state.context }
        this.props.navigation.navigate('Game', params);
    }

    toggleModal = () => {
        this.stopSound()
        this.setState({ showModal: !this.state.showModal });
    };

    renderOverlay = () => {
        return (
            <View style={styles.overlay}>
                <View style={styles.backgroundLock}>
                    <Icon name="lock" size={35} color="#A9A9A9" />
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.container}>

                <Modal useNativeDriver={true} isVisible={this.state.showModal} backdropOpacity={0.5} coverScreen={false} onBackdropPress={() => this.toggleModal()}>
                    <View style={styles.modal}>
                        <Text style={styles.textModal}>Você já jogou com está letra. Quer jogar novamente ? </Text>
                        <TouchableOpacity style={styles.sound} onPress={() => this.playSound()}>
                            <Sound name="sound" size={30} color="#000"></Sound>
                        </TouchableOpacity>
                        <View style={styles.containerModalButtons}>
                            <TouchableOpacity style={styles.buttonModalNo} onPress={() => this.toggleModal()} >
                                <Text style={styles.textButtonsModal}>Não</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.buttonModalYes} onPress={() => this.goToGame()} >
                                <Text style={styles.textButtonsModal}>Sim</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </Modal>

                <View style={styles.viewChoiceLetter}>
                    <Text style={styles.textChoiceLetter}>Escolha uma letra: </Text>
                    <TouchableOpacity style={styles.soundLetter} onPress={() => this.playSoundChoiceLetter()}>
                        <Sound name="sound" size={30} color="#fff"></Sound>
                    </TouchableOpacity>
                </View>


                <ScrollView contentContainerStyle={styles.scrollView}>
                    <View style={styles.blackboard}>
                        <TouchableOpacity style={styles.onePosition} onPress={() => this.letra('A')} >
                            <View style={styles.rounded}>
                                <Text style={styles.letter}>a</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondPosition} onPress={() => this.letra('E')}>
                            <View style={styles.rounded}>
                                <Text style={styles.letter}>e</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.thirdPosition} onPress={() => this.letra('I')}>
                            <View style={styles.rounded}>
                                <Text style={styles.letter}>i</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourthPosition} onPress={() => this.letra('O')}>
                            <View style={styles.rounded}>
                                <Text style={styles.letter}>o</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fifthPosition} onPress={() => this.letra('U')}>
                            <View style={styles.rounded}>
                                <Text style={styles.letter}>u</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={!this.state.levels.secondLevel ? styles.blackboardBlocked : styles.blackboard}>
                        <TouchableOpacity style={styles.onePosition} onPress={this.state.levels.secondLevel ? () => this.letra('B') : null} >
                            <View style={!this.state.levels.secondLevel ? styles.roundedBlocked : styles.rounded}>
                                <Text style={!this.state.levels.secondLevel ? styles.letterBlocked : styles.letter}>b</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondPosition} onPress={this.state.levels.secondLevel ? () => this.letra('P') : null}>
                            <View style={!this.state.levels.secondLevel ? styles.roundedBlocked : styles.rounded}>
                                <Text style={!this.state.levels.secondLevel ? styles.letterBlocked : styles.letter}>p</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.thirdPosition} onPress={this.state.levels.secondLevel ? () => this.letra('T') : null}>
                            <View style={!this.state.levels.secondLevel ? styles.roundedBlocked : styles.rounded}>
                                <Text style={!this.state.levels.secondLevel ? styles.letterBlocked : styles.letter}>t</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourthPosition} onPress={this.state.levels.secondLevel ? () => this.letra('D') : null}>
                            <View style={!this.state.levels.secondLevel ? styles.roundedBlocked : styles.rounded}>
                                <Text style={!this.state.levels.secondLevel ? styles.letterBlocked : styles.letter}>d</Text>
                            </View>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.fifthPosition} onPress={this.state.levels.secondLevel ? () => this.letra('G') : null}>
                            <Text style={styles.letter}>g</Text>
                        </TouchableOpacity> */}
                        {!this.state.levels.secondLevel ? this.renderOverlay() : null}
                    </View>
                    <View style={!this.state.levels.thirdLevel ? styles.blackboardBlocked : styles.blackboard}>
                        <TouchableOpacity style={styles.onePosition} onPress={this.state.levels.thirdLevel ? () => this.letra('F') : null}>
                            <View style={!this.state.levels.thirdLevel ? styles.roundedBlocked : styles.rounded}>
                                <Text style={!this.state.levels.thirdLevel ? styles.letterBlocked : styles.letter}>f</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondPosition} onPress={this.state.levels.thirdLevel ? () => this.letra('S') : null}>
                            <View style={!this.state.levels.thirdLevel ? styles.roundedBlocked : styles.rounded}>
                                <Text style={!this.state.levels.thirdLevel ? styles.letterBlocked : styles.letter}>s</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.thirdPosition} onPress={this.state.levels.thirdLevel ? () => this.letra('V') : null}>
                            <View style={!this.state.levels.thirdLevel ? styles.roundedBlocked : styles.rounded}>
                                <Text style={!this.state.levels.thirdLevel ? styles.letterBlocked : styles.letter}>v</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourthPosition} onPress={this.state.levels.thirdLevel ? () => this.letra('Z') : null}>
                            <View style={!this.state.levels.thirdLevel ? styles.roundedBlocked : styles.rounded}>
                                <Text style={!this.state.levels.thirdLevel ? styles.letterBlocked : styles.letter}>z</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fifthPosition} onPress={this.state.levels.thirdLevel ? () => this.letra('X') : null}>
                            <View style={!this.state.levels.thirdLevel ? styles.roundedBlocked : styles.rounded}>
                                <Text style={!this.state.levels.thirdLevel ? styles.letterBlocked : styles.letter}>x</Text>
                            </View>
                        </TouchableOpacity>
                        {!this.state.levels.thirdLevel ? this.renderOverlay() : null}
                    </View>
                    <View style={!this.state.levels.fourthLevel ? styles.blackboardBlocked : styles.blackboard}>
                        <TouchableOpacity style={styles.onePosition} onPress={this.state.levels.fourthLevel ? () => this.letra('M') : null}>
                            <View style={!this.state.levels.fourthLevel ? styles.roundedBlocked : styles.rounded}>
                                <Text style={!this.state.levels.fourthLevel ? styles.letterBlocked : styles.letter}>m</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondPosition} onPress={this.state.levels.fourthLevel ? () => this.letra('N') : null}>
                            <View style={!this.state.levels.fourthLevel ? styles.roundedBlocked : styles.rounded}>
                                <Text style={!this.state.levels.fourthLevel ? styles.letterBlocked : styles.letter}>n</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.thirdPosition} onPress={this.state.levels.fourthLevel ? () => this.letra('R') : null}>
                            <View style={!this.state.levels.fourthLevel ? styles.roundedBlocked : styles.rounded}>
                                <Text style={!this.state.levels.fourthLevel ? styles.letterBlocked : styles.letter}>r</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourthPosition} onPress={this.state.levels.fourthLevel ? () => this.letra('L') : null}>
                            <View style={!this.state.levels.fourthLevel ? styles.roundedBlocked : styles.rounded}>
                                <Text style={!this.state.levels.fourthLevel ? styles.letterBlocked : styles.letter}>l</Text>
                            </View>
                        </TouchableOpacity>
                        {!this.state.levels.fourthLevel ? this.renderOverlay() : null}
                    </View>
                    <View style={!this.state.levels.fifthLevel ? styles.blackboardBlocked : styles.blackboard}>
                        <TouchableOpacity style={styles.onePosition} onPress={this.state.levels.fifthLevel ? () => this.letra('G') : null}>
                            <View style={!this.state.levels.fifthLevel ? styles.roundedBlocked : styles.rounded}>
                                <Text style={!this.state.levels.fifthLevel ? styles.letterBlocked : styles.letter}>g</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondPosition} onPress={this.state.levels.fifthLevel ? () => this.letra('J') : null}>
                            <View style={!this.state.levels.fifthLevel ? styles.roundedBlocked : styles.rounded}>
                                <Text style={!this.state.levels.fifthLevel ? styles.letterBlocked : styles.letter}>j</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourthPosition} onPress={this.state.levels.fifthLevel ? () => this.letra('Q') : null}>
                            <View style={!this.state.levels.fifthLevel ? styles.roundedBlocked : styles.rounded}>
                                <Text style={!this.state.levels.fifthLevel ? styles.letterBlocked : styles.letter}>q</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fifthPosition} onPress={this.state.levels.fifthLevel ? () => this.letra('C') : null}>
                            <View style={!this.state.levels.fifthLevel ? styles.roundedBlocked : styles.rounded}>
                                <Text style={!this.state.levels.fifthLevel ? styles.letterBlocked : styles.letter}>c</Text>
                            </View>
                        </TouchableOpacity>
                        {!this.state.levels.fifthLevel ? this.renderOverlay() : null}
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
        marginLeft: 55,
        marginRight: 55,
        marginBottom: 55,
        marginTop: 35
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

    blackboardBlocked: {
        // justifyContent: "center",
        // alignItems: 'center',
        flexDirection: 'row',
        width: 248,
        height: 170.5,
        backgroundColor: '#C0C0C0',
        borderColor: '#696969',
        borderWidth: 5,
        marginBottom: 67.5,
        padding: 29,
        // opacity: 0.6
    },

    backgroundLock: {
        justifyContent: "center",
        alignItems: 'center',
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#808080',
        marginLeft: 55,
        marginRight: 55,
        marginTop: 20,
        marginBottom: 20
    },

    letter: {
        fontSize: 30,
        fontWeight: 'normal',
        color: '#658A5D',
        marginBottom: 5
        // backgroundColor: '#696969',
    },

    rounded: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        backgroundColor: '#fff',
        justifyContent: 'center',
        // marginTop: 5
    },

    letterBlocked: {
        fontSize: 30,
        fontWeight: 'normal',
        color: '#fff',
        marginBottom: 5
        // backgroundColor: '#696969',
    },

    roundedBlocked: {
        width: 36,
        height: 36,
        borderRadius: 18,
        alignItems: 'center',
        backgroundColor: '#808080',
        justifyContent: 'center',
        opacity: 0.5
    },

    onePosition: {
        marginTop: 60,
        marginLeft: -15
    },

    secondPosition: {
        marginLeft: 10,
    },

    thirdPosition: {
        marginLeft: 5,
        marginTop: 70
    },

    fourthPosition: {
        marginLeft: 15,
        marginTop: -20
    },

    fifthPosition: {
        marginTop: 75,
        marginLeft: 0
    },

    onePositionBlocked: {
        marginBottom: 100,
        marginRight: 60,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#000'
    },

    secondPositionBlocked: {
        marginLeft: 20,
    },

    thirdPositionBlocked: {
        marginLeft: 30,
        marginTop: 70
    },

    fourthPositionBlocked: {
        marginLeft: 40,
        marginTop: -20
    },

    fifthPositionBlocked: {
        marginTop: 75,
        marginLeft: 10
    },

    overlay: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
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

    textModal: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlignVertical: 'center',
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 5
    },

    containerModalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 250,
        marginTop: 20
    },

    buttonModalYes: {
        backgroundColor: '#32CD32',
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 10
    },

    buttonModalNo: {
        backgroundColor: '#FF0000',
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 10
    },

    textButtonsModal: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '800',

    },

    viewChoiceLetter: {
        alignItems: 'center',
        marginTop: 20,
        // flexDirection: 'row'
    },

    textChoiceLetter: {
        color: '#fff',
        fontSize: 26,
        // fontWeight: 'bold'
    },

    soundLetter: {
        color: '#fff'
    }


})
