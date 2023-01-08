import React, { useState, useRef, useContext } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image, TextInput, Keyboard } from 'react-native';

import { AuthContext } from '../../context/AuthContext';

import Colors from '../../config/Colors';
import Spinner from 'react-native-loading-spinner-overlay';

function LoginScreen({ navigation }) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    const {isLoading, login} = useContext(AuthContext)

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.background}>
                <Spinner visible={isLoading} />
                <Image style={styles.logo} source={require('../../assets/logo.png')} />

                <Text>Login</Text>

                <TouchableOpacity style={styles.inputArea} onPress={() => { usernameRef.current.focus() }}>
                    <TextInput style={styles.input} placeholder='Username'
                    onChangeText={newUser => setUsername(newUser)}
                    defaultValue={username}
                    ref={usernameRef} />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.inputArea} onPress={() => { passwordRef.current.focus() }}>
                    <TextInput style={styles.input} placeholder='Password'
                    onChangeText={newPassword => setPassword(newPassword)}
                    secureTextEntry={true}
                    defaultValue={password}
                    ref={passwordRef} />
                </TouchableOpacity>

                <View style={styles.helper}>
                    <Text style={styles.helpText}>Need An Account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Register")}><Text style={styles.link}>Register</Text></TouchableOpacity>
                </View>

                <View style={styles.submitContainer}>
                    <TouchableOpacity style={[styles.button, styles.back]} onPress={() => navigation.navigate('Landing')}>
                        <Text style={styles.interactableText}>Back</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.login]} onPress={() => login(username, password)}>
                        <Text style={styles.interactableText}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Background
    },
    logo: {
        width: 150,
        height: 150,
    },
    submitContainer: {
        width: '90%',
        height: 50,
        flexDirection: 'row',
        marginTop: 20
    },
    inputArea: {
        width: '90%',
        height: 40,
        
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderWidth: 1,
        borderRadius: 10,
        borderColor: Colors.Outline,
        margin: 5,
        padding: 10

    },
    input: {
        flex: 1,
        fontSize: 20
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        margin: 5
    },
    interactableText: {
        fontSize: 25,
        fontWeight: '600',
        color: Colors.TextDark
    },
    login: {
        backgroundColor: Colors.Green
    },
    back: {
        backgroundColor: Colors.Red
    },
    helper: {
        flexDirection: 'row'
    },
    helpText: {
        color: Colors.TextLight,
        padding: 5
    },
    link: {
        color: Colors.Blue,
        padding: 5
    }
})

export default LoginScreen;