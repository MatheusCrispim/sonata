import React, {Component} from 'react';

import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

// import { Container } from './styles';

export default class Play extends Component {

    render(){
        return (
            <View style={styles.container}>
                <Image style={styles.firstCloud} source={require('../assets/images/first-cloud.png')} />
                <Image style={styles.secondCloud}  source={require('../assets/images/second-cloud.png')} />
                <Image style={styles.thirdCloud}  source={require('../assets/images/third-cloud.png')} />
                <Image style={styles.fourthCloud}  source={require('../assets/images/fourth-cloud.png')} />

                <TouchableOpacity style={styles.playButton} onPress={() => this.props.navigation.navigate('Context')}> 
                    <Icon name="play" size={70} color="#49BD36" style={{marginLeft: 5}} />
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
        width:140,
        height:140,
        backgroundColor:'#fff',
        borderRadius:70,
        marginBottom: 78,
        shadowColor: 'black',
        shadowOpacity: 0.9,
        elevation: 8,
    },

    firstCloud: {
        marginLeft: 'auto',
        marginBottom: 'auto',
        marginTop: -30,
        position: "relative"
    },

    secondCloud: {
        position: "relative",
        marginRight: "auto",
        marginBottom: -80,
    },

    thirdCloud: {
        position: "relative",
        marginLeft: "auto"
    },

    fourthCloud: {
        position: "relative",
        marginTop:"auto",
        marginRight: "auto",
        marginBottom: -250
    }
});
