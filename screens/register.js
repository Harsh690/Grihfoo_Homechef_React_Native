import React, {Component} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';

export default class Register extends Component {

    constructor(props){
        super(props);
        const number = this.props.navigation.getParam('username',null)
        this.state = {
            isModalVisible: false,
            pin1: "",
            pin2: "",
            pin3: "",
            pin4: "",
            pin5: "",
            pin6: '',
            first_name:'',
            last_name: '',
            email:'',
            address: '',
            final_number: number
            
        }
    }

    closeModal() {
        this.setState({
            isModalVisible: false
        });
    }

    getOTP() {
        this.register()
    }

    submitOTP() {
        this.setState({
            isModalVisible: false
        });
        
    }
    change_first_name(value){
        this.setState({
            first_name:value
        });
    }
    change_last_name(value){
        this.setState({
            last_name:value
        });
    }
    change_email(value){
        this.setState({
            email:value
        });
    }
    change_Address(value){
        this.setState({
            address:value
        });
    }
    change_number(value){
        this.setState({
            number:value
        });
    }
    async register(){
        try{
            await fetch ('http://192.168.0.111:8080/api/homemaker/register',{
                method:'POST',
                mode:'no-cors',
                headers:{
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    'username':this.state.final_number,
                    'firstname':this.state.first_name,
                    'lastname': this.state.last_name,
                    'email':this.state.email,
                    'address':this.state.address
                })
            })
            .then((response)=>{
                console.log(response.status);
                if (response.status==204){
            
                    this.props.navigation.navigate('TabNav')
                }
            })
        }catch(e){
            console.log(e);
        }
    }
    
    render(){
        return(
            <View style={{flex: 1}}>
                <View style={{marginTop: 'auto', marginBottom: 'auto', alignItems: 'center'}}>
                <Text style={{fontSize: 32, fontWeight: 'bold'}}>Register to Grihfoo !</Text>
                <TextInput placeholder="Enter your first name" style={{textAlign: 'center'}} value={this.state.first_name} onChangeText={(value)=>this.change_first_name(value)} />
                <TextInput placeholder="Enter your Last name" style={{textAlign: 'center'}} value={this.state.last_name} onChangeText={(value)=>this.change_last_name(value)} />
                <TextInput placeholder="Enter email" style={{textAlign: 'center'}} value={this.state.email} onChangeText={(value)=>{this.change_email(value)}}/>
                <TextInput placeholder="Enter address" style={{textAlign: 'center'}} value ={this.state.address}onChangeText={(value)=>{this.change_Address(value)}}/>
                <TouchableOpacity onPress={() => {this.getOTP()}} style={{ backgroundColor: '#31326f', height: 40, flexDirection: 'row', justifyContent: 'center', borderWidth: 1, borderColor: '#e8e8e8' }}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', paddingTop: 8, paddingHorizontal: 10 }}>Get OTP</Text>
                </TouchableOpacity>
                </View>

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
                                    this.setState({ pin4: pin5 })
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
                                    this.setState({ pin5: pin6 })
                                }
                                }
                                value={this.state.pin5}
                                //placeholder = {"Enter your name"}
                                style={styles.OTPinput}
                                keyboardType={'numeric'}
                            />
                            <TextInput
                                ref={'pin4ref'}
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