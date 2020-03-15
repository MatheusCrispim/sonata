import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Actions from '../api/actions';
import { connect }  from 'react-redux';

const { getContextChallenges } = Actions;
// import { Container } from './styles';


class Context extends Component {

    static navigationOptions = {
        headerTitleStyle: { alignSelf: 'center' },
        title: 'CONTEXTO DO JOGO',
    };

    selectContenxt = (id, name)=>{
        this.props.dispatch(getContextChallenges(id));
        this.props.navigation.navigate('Letters', name);
    }

    render() {
        return (
            <View style={styles.container}> 
                <ScrollView >

                    <TouchableOpacity style={styles.contentTouch} onPress={()=>this.selectContenxt(10, 'frutas')}>
                        <View style={[styles.contentView, {marginTop:58}]}>
                            <Text style={{ color: "#FFF", fontSize: 18, marginBottom: -33 }}>FRUTAS</Text>
                            <ImageBackground source={require("../assets/images/cloud.png")} style={styles.contentImageBackground}>
                                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                    <Image source={require("../assets/images/frutas.png")} style={styles.contentImage}>
                                    </Image>
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contentTouch} >
                        <View style={styles.contentView}>
                            <Text style={{ color: "#FFF", fontSize: 18, marginBottom: -33 }}>ANIMAIS</Text>
                            <ImageBackground source={require("../assets/images/cloud.png")} style={styles.contentImageBackground}>
                                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                    <Image source={require("../assets/images/animais.png")} style={styles.contentImage}>
                                    </Image>
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contentTouch} >
                        <View style={styles.contentView}>
                            <Text style={{ color: "#FFF", fontSize: 18, marginBottom: -33 }}>ESCOLA</Text>
                            <ImageBackground source={require("../assets/images/cloud.png")} style={styles.contentImageBackground}>
                                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                    <Image source={require("../assets/images/escola.png")} style={styles.contentImage}>
                                    </Image>
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.contentTouch} >
                        <View style={[styles.contentView, {marginBottom:38}]}>
                            <Text style={{ color: "#FFF", fontSize: 18, marginBottom: -33 }}>CASA</Text>
                            <ImageBackground source={require("../assets/images/cloud.png")} style={styles.contentImageBackground}>
                                <View style={{ justifyContent: 'center', alignSelf: 'center' }}>
                                    <Image source={require("../assets/images/casa.png")} style={styles.contentImage}>
                                    </Image>
                                </View>
                            </ImageBackground>
                        </View>
                    </TouchableOpacity>
                </ScrollView>
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

    contentTouch: {
        justifyContent: 'center',
        alignSelf: 'center',

    },

    contentView: {
        height: 260,
        width: 280,
        marginBottom: -32,
        justifyContent: 'center',
        alignItems: 'center'
    },

    contentImageBackground: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    contentImage: {
        alignSelf: 'center',
        justifyContent: 'center'
    }

})

export default connect()(Context);