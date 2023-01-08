import axios from "axios";
import React, { createContext, useState } from "react";
import { TODO_URL } from "../config/URL";


export const TodoContext = createContext()

export const TodoProvider = ({ children }) => {
    const [todos, setTodos] = useState([])
    const [loadingTodos, setLoadingTodos] = useState(false)
    
    const getTodos = (userInfo) => {
        setLoadingTodos(true)

        axios.get(`${TODO_URL}/${userInfo.username}`).then(res => {
            if(res.data.message !== undefined) {
                console.log(res.data.message)
                return
            }
            setTodos(res.data)
            setLoadingTodos(false)
        }).catch(e => {
            console.log(`Get TODOs Error: ${e}`)
            setLoadingTodos(false)
        })

        setLoadingTodos(false)
    }

    const createTodo = (userInfo, content) => {
        axios.post(`${TODO_URL}/create`,
        { authKey: userInfo.authKey, username: userInfo.username, content }).then(res => {
            if(res.data.message !== undefined) {
                console.log(res.data.message)
                return
            }
            setTodos(res.data)
        }).catch(e => {
            console.log(`Create TODO Error: ${e}`)
        })
    }

    const markTodo = (userInfo, id, completed) => {
        axios.post(`${TODO_URL}/mark`,
        { authKey: userInfo.authKey, username: userInfo.username, completed, id }).then(res => {
            if(res.data.message !== undefined) {
                console.log(res.data.message)
                return
            }
            setTodos(res.data)
        }).catch(e => {
            console.log(`Create TODO Error: ${e}`)
        })
    }

    const editTodo = (userInfo, id, content) => {
        axios.post(`${TODO_URL}/edit`,
        { authKey: userInfo.authKey, username: userInfo.username, content, id }).then(res => {
            if(res.data.message !== undefined) {
                console.log(res.data.message)
                return
            }
            setTodos(res.data)
        }).catch(e => {
            console.log(`Create TODO Error: ${e}`)
        })
    }

    const removeTodo = (userInfo, id) => {
        axios.post(`${TODO_URL}/delete`,
        { authKey: userInfo.authKey, username: userInfo.username, id }).then(res => {
            if(res.data.message !== undefined) {
                console.log(res.data.message)
                return
            }
            setTodos(res.data)
        }).catch(e => {
            console.log(`Remove TODO Error: ${e}`)
        })
    }

    return (
        <TodoContext.Provider value={{ todos, loadingTodos, getTodos, createTodo, markTodo, editTodo, removeTodo }}>
            {children}
        </TodoContext.Provider>
    )
}