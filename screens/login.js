import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pin1: "",
            pin2: "",
            pin3: "",
            pin4: "",
            pin5: '',
            pin6: '',
            username: '',
            password:'',
            currentNumber : '',
            jwt_token:'',
            
            isModalVisible: false
        }
    }

    closeModal() {
        this.setState({
            isModalVisible: false
        });
    }
    changeText(value){
        this.setState({
            currentNumber:value
        });
    }
    set_jwt_token(value){
        this.setState({
            jwt_token:value
        });
    }

    getOTP() {
        // this.props.navigation.navigate('TabNav')
        this.verifyotp();
    }

    async startSession() {
        try {
            await AsyncStorage.setItem("sessionId", this.state.jwt_token);
            this.props.navigation.navigate('TabNav')
        }
        catch (error){
            console.log("Error saving data: "+error);
        }
    }

    submitOTP() {
        this.setState({
            isModalVisible: false
        });
        this.generate_jwt_token();
    }

    toRegister() {
        this.props.navigation.navigate('Register');
    }
    async verifyotp(){
        try{
            await fetch('http://192.168.0.111:8080/api/homemaker/'+this.state.currentNumber,{
                method: 'GET',
                mode:'no-cors',
            })
            .then((response)=> {
                console.log("The status for this call is "+response.status);
                return  response.json()
                
            })
            .then((ifValid)=>{
                if(ifValid==true){
                    this.generateOtp();
                    console.log(ifValid);
                }
                else{
                    console.log(ifValid);
                    this.props.navigation.navigate('Number')
                }
            })
        }
        catch(e){
            console.log(e);
        }
    }

    async generateOtp(){
        try{
            await fetch('http://192.168.0.111:8080/api/homemaker/generateLoginOtp/'+this.state.currentNumber,{
                method:'POST',
                mode:'no-cors',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    'username':this.state.currentNumber,
                    'password':''                
                })
            })
            .then((response)=>{
                if (response.status==204){
                    this.setState({
                        isModalVisible:true
                    })
                   
                }
            })
                
        }catch(e){
            console.log(e);
        }
    }

    async generate_jwt_token(){
        try{
            await fetch('http://192.168.0.111:8080/api/homemaker/generateTokenLogin',{
                method:'POST',
                mode:'no-cors',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    'username':this.state.currentNumber,
                    'password':this.state.pin1+this.state.pin2+this.state.pin3+this.state.pin4+this.state.pin5+this.state.pin6
                })
            }).then((response)=>{
                 if (response.status==200){
                     return response.json()
                 }else{
                     this.props.navigation.navigate('Number')
                 }

            }).then((value)=>{
                this.setState({
                    jwt_token:value.token
                })
                this.startSession();
            })
        }catch(e){
            console.log(e);
        }
    }
    async componentDidMount() {
        try {
            let sessionValue = await AsyncStorage.getItem("sessionId");
            if (sessionValue == this.state.jwt_token){
                this.props.navigation.navigate('TabNav');
            }
            else{
                console.log("Session not found");
            }
        }
        catch (error) {
            console.log("Error retriving data: "+error);
        }
    }
    
    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 32, fontWeight: 'bold', marginTop: 'auto' }}>Login to Grihfoo</Text>
                <TextInput placeholder="Enter your number" keyboardType={'numeric'} style={{ textAlign: 'center' }} 
                value = {this.state.currentNumber}
                onChangeText={(value)=> this.changeText(value)}
                />
                <TouchableOpacity onPress={() => { this.getOTP() }} style={{ backgroundColor: '#31326f', height: 40, flexDirection: 'row', marginBottom: 'auto', justifyContent: 'center', borderWidth: 1, borderColor: '#e8e8e8' }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', paddingTop: 8, paddingHorizontal: 10 }}>Get OTP</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { this.toRegister() }} style={{ paddingBottom: 50, marginTop: 'auto' }} >
                    <Text style={{fontSize: 16, color: 'blue'}} >New to Grihfoo ? Register here !</Text>
                </TouchableOpacity>

                <Modal animationIn="slideInUp"
                    animationOut="slideOutDown"
                    onBackdropPress={() => this.closeModal()}
                    isVisible={this.state.isModalVisible}
                    style={{ backgroundColor: 'white', maxHeight: Dimensions.get('window').height / 4, marginTop: 'auto', marginBottom: 'auto' }}>
                    <Text style={{ textAlign: "center", fontWeight: "bold", marginTop: 5 }}>We have sent an OTP to your number</Text>
                    <View style={{ flex: 1, paddingTop: 25 }}>
                        <View style={{ flex: 0.6, justifyContent: 'space-evenly', flexDirection: "row" }}>
                            <TextInput
                                ref={'pin1ref'}
                                maxLength={1}
                                //placeholder = {"Enter your name"}
                                onChangeText={(pin1) => {
                                    this.setState({ pin1: pin1 })
                                    if (pin1 != "") {
                                        this.refs.pin2ref.focus()
                                    }
                                }}
                                value={this.state.pin1}
                                style={styles.OTPinput}
                                keyboardType={'numeric'}

                            />
                            <TextInput
                                ref={'pin2ref'}
                                maxLength={1}
                                onChangeText={(pin2) => {
                                    this.setState({ pin2: pin2 })
                                    if (pin2 != "") {
                                        this.refs.pin3ref.focus()
                                    }
                                }}
                                value={this.state.pin2}
                                //placeholder = {"Enter your name"}
                                style={styles.OTPinput}
                                keyboardType={'numeric'}
                            />
                            <TextInput
                                ref={'pin3ref'}
                                maxLength={1}
                                onChangeText={(pin3) => {
                                    this.setState({ pin3: pin3 })
                                    if (pin3 != "") {
                                        this.refs.pin4ref.focus()
                                    }
                                }}
                                value={this.state.pin3}
                                //placeholder = {"Enter your name"}
                                style={styles.OTPinput}
                                keyboardType={'numeric'}
                            />
                            <TextInput
                                ref={'pin4ref'}
                                maxLength={1}
                                onChangeText={(pin4) => {
                                    this.setState({ pin4: pin4 })
                                    if (pin4 != "") {
                                        this.refs.pin5ref.focus()
                                    }
                                }
                                }
                                value={this.state.pin4}
                                //placeholder = {"Enter your name"}
                                style={styles.OTPinput}
                                keyboardType={'numeric'}
                            />
                            <TextInput
                                ref={'pin5ref'}
                                maxLength={1}
                                onChangeText={(pin5) => {
                                    this.setState({ pin5: pin5 })
                                    if (pin5 != "") {
                                        this.refs.pin6ref.focus()
                                    }
                                }
                                }
                                value={this.state.pin5}
                                //placeholder = {"Enter your name"}
                                style={styles.OTPinput}
                                keyboardType={'numeric'}
                            />
                            <TextInput
                                ref={'pin6ref'}
                                maxLength={1}
                                onChangeText={(pin6) => {
                                    this.setState({ pin6: pin6 })
                                }
                                }
                                value={this.state.pin6}
                                //placeholder = {"Enter your name"}
                                style={styles.OTPinput}
                                keyboardType={'numeric'}
                            />
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => { this.submitOTP() }} style={{ backgroundColor: '#31326f', height: 40, flexDirection: 'row', justifyContent: 'center', borderWidth: 1, borderColor: '#e8e8e8' }}>
                        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', paddingTop: 8, paddingHorizontal: 10 }}>Submit</Text>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    OTPinput: {
        backgroundColor: '#f5f4f2',
        justifyContent: 'center',
        fontWeight: '600',
        alignSelf: "center",
        fontSize: 18,
        height: 45,
        width: '10%',
        borderRadius: 30,
        borderWidth: 0.5,
        borderColor: 'grey',
        textAlign: 'center',
        marginBottom: 0
    }
})