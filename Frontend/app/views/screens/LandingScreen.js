import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';

import Colors from '../../config/Colors';

function LandingScreen({ navigation }) {
    return (
        <View style={styles.background}>
            <Image style={styles.logo} source={require('../../assets/landing-logo.png')} />
            <View style={styles.container}>
                <TouchableOpacity style={[styles.button, styles.login]} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.interactableText}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.register]} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.interactableText}>Register</Text>
                </TouchableOpacity>
            </View>
        </View>
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
        width: 300,
        height: 300,
    },
    container: {
        width: '100%',
        height: '20%',
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        margin: 10
    },
    interactableText: {
        fontSize: 25,
        fontWeight: '600',
        color: Colors.TextDark
    },
    login: {
        backgroundColor: Colors.Green
    },
    register: {
        backgroundColor: Colors.Blue
    }
})

export default LandingScreen;