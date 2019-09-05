import React, { Component } from 'react';

import { View, StyleSheet, Image, Text, TouchableOpacity } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Sound from 'react-native-vector-icons/AntDesign';
import { connect }  from 'react-redux';

// import { Container } from './styles';

class Game extends Component {

    state = {
        challengeId: 0,
        currentChallenge: {image:'', sound: '', word: ''}
    }

    componentDidMount(props){
        if(this.props.challenges.data > 0){
            this.setState({currentChallenge: this.props.challenges.data[0]});
        }
    }


    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props){
            this.setState({currentChallenge: this.props.challenges.data[0]});
        }
    }

    correct = ()=>{
        let challengeId = this.state.challengeId+1;
        this.setState({currentChallenge: this.props.challenges.data[challengeId], challengeId: challengeId});
    }

    wrong = ()=>{
        let challengeId = this.state.challengeId+1;
        this.setState({currentChallenge: this.props.challenges.data[challengeId], challengeId: challengeId});
    }

    render() {
        const letra = this.props.navigation.state.params;

        return (
            <View style={styles.container}>
                <Image style={styles.firstCloud} source={require('../assets/images/first-cloud.png')} />
                <Image style={styles.secondCloud} source={require('../assets/images/second-cloud.png')} />
                <Image style={styles.thirdCloud} source={require('../assets/images/third-cloud.png')} />
                <Image style={styles.fourthCloud} source={require('../assets/images/fourth-cloud.png')} />

                <View style={styles.containerStars}>
                    <Icon name="star" size={50} color="#EFCE4A"  />
                    <Icon name="star" size={50} color="#EFCE4A"  />
                    <Icon name="star" size={50} color="#EFCE4A"  />
                    <Icon name="star" size={50} color="#EFCE4A"  />
                    <Icon name="star" size={50} color="#EFCE4A"  />
                </View>

                <View style={styles.containerCenter}>
                    <View style={styles.containerLetter}>
                        <Text style={styles.letter}>{letra}</Text>
                        <TouchableOpacity style={styles.sound} onPress={() => alert('Saída de som')}>
                            <Sound  name="sound" size={40} color="#000"></Sound>
                        </TouchableOpacity>                        
                    </View>
                    <View style={styles.containerImage}>
                        <Image source={{uri: this.state.currentChallenge.image}} style={{height:100, resizeMode:'stretch' ,margin: 5 }}  />
                        <TouchableOpacity style={styles.sound} onPress={() => alert('Saída de som')}>
                            <Sound  name="sound" size={40} color="#000"></Sound>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.containerButtons}>
                    <TouchableOpacity style={styles.buttonRed}  onPress={this.wrong}>
                        <Icon name="close" size={50} color="#fff"  />
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
        alignSelf:'center'
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
        resizeMode : 'stretch',
        alignSelf: 'center',
        marginBottom: 10,
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

})

const mapStateToProps = (state)=>({
    challenges: state.challenge
});

export default connect(mapStateToProps)(Game);