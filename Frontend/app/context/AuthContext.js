import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useState } from "react";
import { USER_URL } from "../config/URL";


export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({})
    const [isLoading, setIsLoading] = useState(false)


    const register = (username, password) => {
        setIsLoading(true)

        axios.post(`${USER_URL}/register`, {
            username, password
        }).then(res => {
            let userInfo = res.data
            setUserInfo(userInfo)
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            setIsLoading(false)
        }).catch(e => {
            console.log(`Registration Error: ${e}`);
            setIsLoading(false)
        })
    }

    const login = (username, password) => {
        setIsLoading(true)

        axios.post(`${USER_URL}/login`, {
            username, password
        }).then(res => {
            let userInfo = res.data
            console.log(userInfo)
            setUserInfo(userInfo)
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
            setIsLoading(false)
        }).catch(e => {
            console.log(`Login Error: ${e}`);
            setIsLoading(false)
        })
    }

    const logout = () => {
        setIsLoading(true)

        axios.post(`${USER_URL}/logout`, userInfo).then(res => {
            console.log(res.data)
            AsyncStorage.removeItem('userInfo')
            setUserInfo({})
            setIsLoading(false)
        }).catch(e => {
            console.log(`Logout Error: ${e}`);
            setIsLoading(false)
        })
    }
    
    return (
        <AuthContext.Provider value={{ isLoading, userInfo, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}