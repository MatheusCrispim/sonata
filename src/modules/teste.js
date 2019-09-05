import React, { Component } from 'react';
import { connect }  from 'react-redux';
import { Button, Text, View } from 'react-native';

import Actions  from '../api/actions';
const { getContext  } = Actions;

class Teste extends Component{

    constructor(props){
        super(props);

        this.state = {
            contexts: [],
            challenges: []
        };

        this.props.dispatch(getContext());
    }

    getContext = ()=>{
        this.props.dispatch(getContext());
        alert(JSON.stringify(this.props.contexts));
    }

    render(){
        return(
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text>Hello, world!</Text>
            <Button
                onPress={ this.getContext}
                title="Press Me"/>
        </View>
        );
    }
}

const mapStateToProps = (state)=>({
    contexts: state.context.data,
    challenges: state.challenge.data
});

export default connect(mapStateToProps)(Teste);