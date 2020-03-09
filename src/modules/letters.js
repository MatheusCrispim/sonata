import React, { Component } from 'react';

import { View, StyleSheet, ScrollView, Text, TouchableOpacity, AsyncStorage } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Modal from "react-native-modal";

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
        title: 'NÍVEL DE JOGO',
    };

    componentDidUpdate() {
        this.verifyProgress()
    }

    componentDidMount() {
        this.verifyProgress();
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
        } else {
            this.goToGame();
        }
    };

    goToGame() {
        this.setState({ showModal: false })
        const params = { letra: this.state.auxLetter, context: this.state.context }
        this.props.navigation.navigate('Game', params);
    }

    toggleModal = () => {
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
                        <Text style={styles.textModal}>Oi, você já jogou e venceu com está letra. Deseja jogar novamente ? </Text>
                        <Text style={{ color: '#000', fontSize: 12, }}>(OBS: Ideal que seja um áudio aqui)</Text>
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
                    <View style={!this.state.levels.secondLevel ? styles.blackboardBlocked : styles.blackboard}>
                        <TouchableOpacity style={styles.onePosition} onPress={this.state.levels.secondLevel ? () => this.letra('B') : null} >
                            <Text style={styles.letter}>b</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondPosition} onPress={this.state.levels.secondLevel ? () => this.letra('P') : null}>
                            <Text style={styles.letter}>p</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.thirdPosition} onPress={this.state.levels.secondLevel ? () => this.letra('T') : null}>
                            <Text style={styles.letter}>t</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourthPosition} onPress={this.state.levels.secondLevel ? () => this.letra('D') : null}>
                            <Text style={styles.letter}>d</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fifthPosition} onPress={this.state.levels.secondLevel ? () => this.letra('G') : null}>
                            <Text style={styles.letter}>g</Text>
                        </TouchableOpacity>
                        {!this.state.levels.secondLevel ? this.renderOverlay() : null}
                    </View>
                    <View style={!this.state.levels.thirdLevel ? styles.blackboardBlocked : styles.blackboard}>
                        <TouchableOpacity style={styles.onePosition} onPress={this.state.levels.thirdLevel ? () => this.letra('F') : null}>
                            <Text style={styles.letter}>f</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondPosition} onPress={this.state.levels.thirdLevel ? () => this.letra('S') : null}>
                            <Text style={styles.letter}>s</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.thirdPosition} onPress={this.state.levels.thirdLevel ? () => this.letra('V') : null}>
                            <Text style={styles.letter}>v</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourthPosition} onPress={this.state.levels.thirdLevel ? () => this.letra('Z') : null}>
                            <Text style={styles.letter}>z</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fifthPosition} onPress={this.state.levels.thirdLevel ? () => this.letra('X') : null}>
                            <Text style={styles.letter}>x</Text>
                        </TouchableOpacity>
                        {!this.state.levels.thirdLevel ? this.renderOverlay() : null}
                    </View>
                    <View style={!this.state.levels.fourthLevel ? styles.blackboardBlocked : styles.blackboard}>
                        <TouchableOpacity style={styles.onePosition} onPress={this.state.levels.fourthLevel ? () => this.letra('M') : null}>
                            <Text style={styles.letter}>m</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondPosition} onPress={this.state.levels.fourthLevel ? () => this.letra('N') : null}>
                            <Text style={styles.letter}>n</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.thirdPosition} onPress={this.state.levels.fourthLevel ? () => this.letra('R') : null}>
                            <Text style={styles.letter}>r</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourthPosition} onPress={this.state.levels.fourthLevel ? () => this.letra('L') : null}>
                            <Text style={styles.letter}>l</Text>
                        </TouchableOpacity>
                        {!this.state.levels.fourthLevel ? this.renderOverlay() : null}
                    </View>
                    <View style={!this.state.levels.fifthLevel ? styles.blackboardBlocked : styles.blackboard}>
                        <TouchableOpacity style={styles.onePosition} onPress={this.state.levels.fifthLevel ? () => this.letra('H') : null}>
                            <Text style={styles.letter}>h</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondPosition} onPress={this.state.levels.fifthLevel ? () => this.letra('J') : null}>
                            <Text style={styles.letter}>j</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fourthPosition} onPress={this.state.levels.fifthLevel ? () => this.letra('Q') : null}>
                            <Text style={styles.letter}>q</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.fifthPosition} onPress={this.state.levels.fifthLevel ? () => this.letra('C') : null}>
                            <Text style={styles.letter}>c</Text>
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
        fontSize: 36,
        fontWeight: 'normal',
        color: '#fff',
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
        textAlign: 'center'
    },

    containerModalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 250,
        marginTop: 20
    },

    buttonModalYes: {
        backgroundColor:  '#32CD32',
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 10,
        paddingTop: 10,
        borderRadius: 10
    },

    buttonModalNo: {
        backgroundColor:  '#FF0000',
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

    }


})
