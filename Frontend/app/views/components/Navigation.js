import React, { useContext } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AuthContext } from '../../context/AuthContext';
import { TodoProvider } from '../../context/TodoContext';

import HomeScreen from '../screens/HomeScreen';
import LandingScreen from '../screens/LandingScreen'
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const Stack = createNativeStackNavigator()

function Navigation() {
    const {userInfo} = useContext(AuthContext)

    return (
        <TodoProvider>
        <NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
                {userInfo.authKey ?
                <Stack.Screen 
                name='Home'
                component={HomeScreen}
                />
                : 
                <>
                    <Stack.Screen 
                        name='Landing'
                        component={LandingScreen}
                    />
                    <Stack.Screen 
                        name='Login'
                        component={LoginScreen}
                    />
                    <Stack.Screen 
                        name='Register'
                        component={RegisterScreen}
                    />
                </>
                }
				
			</Stack.Navigator>
        </NavigationContainer>
        </TodoProvider>
    );
}

export default Navigation;