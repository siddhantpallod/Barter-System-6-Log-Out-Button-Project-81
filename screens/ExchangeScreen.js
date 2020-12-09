import React from 'react';
import {View,Text,TextInput,TouchableOpacity,Alert} from 'react-native';
import firebase from 'firebase';
import db from '../config';

export default class ExchangeScreen extends React.Component{

    constructor(){
        super();
        this.state = {
            email : firebase.auth().currentUser.email,
            itemName : '',
            description : ''
        }
    }

    addItem = (itemName,description) => {
        var email = this.state.email
        db.collection('exchangeRequests').add({
            "email" : email,
            "itemName" : itemName,
            "description" : description
        })
        this.setState({
            itemName : '',
            description : ''
        })

        return Alert.alert(
            'Item ready to exchange',
            '',
            [
                {text: 'OK', onPress: ()=> {
                    this.props.navigation.navigate('Home')
                }}
            ]
        );
    }

    render(){
        return(
            <View style = {{backgroundColor : 'yellow'}}>
                <View style = {{backgroundColor : 'cyan'}}>
                    <Text style = {{
                        color : 'red',
                        fontSize : 30,
                        textAlign : 'center',
                    }}> Exchange </Text>
                </View>
                <View>
                    <TextInput
                    style = {{
                        borderWidth : 3,
                        alignSelf : 'center',
                        width : 300,
                        height : 30,
                        marginTop : 50
                    }}
                    placeholder = 'Item Name'
                    onChangeText = {(text)=>{
                        this.setState({
                            itemName : text
                        })
                    }}
                    />

                    <TextInput
                    style = {{
                        borderWidth : 3,
                        alignSelf : 'center',
                        width : 300,
                        height : 100,
                        marginTop : 30
                    }}
                    placeholder = 'Description'
                    multiline = {true}
                    onChangeText = {(text)=> {
                        this.setState({
                            description : text
                        })
                    }}
                    />  
                </View>
                <View>
                    <TouchableOpacity 
                    style = {{
                        alignSelf : 'center',
                        marginBottom : 500,
                        backgroundColor : 'cyan',
                        alignSelf : 'center',
                        borderWidth : 3,
                        marginTop : 30,
                        borderRadius : 15
                    }}
                    onPress = {()=> {
                        this.addItem(this.state.itemName,this.state.description)
                    }}
                    >
                        <Text style = {{
                            fontSize : 20,
                            textAlign :'center'
                        }}> Add Item </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}