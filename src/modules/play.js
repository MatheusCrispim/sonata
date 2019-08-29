import React, {Component} from 'react';

import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// import { Container } from './styles';

export default class Play extends Component {

    render(){
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.playButton}> 
                    <Icon name="play" size={60} color="#49BD36" style={{marginLeft: 5}} />
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#50B3DD',
        alignItems:'center',
        justifyContent:'flex-end',
    },
    
    playButton: {
        borderWidth:5,
        borderColor:'#86D5FE',
        alignItems:'center',
        justifyContent:'center',
        width:120,
        height:120,
        backgroundColor:'#fff',
        borderRadius:60,
        marginBottom: 78,
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 8,
    },
});
