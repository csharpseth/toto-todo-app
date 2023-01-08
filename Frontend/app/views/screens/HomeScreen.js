import React, { useEffect, useContext, useState, useRef } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, Image, TextInput, ScrollView, Dimensions } from 'react-native';

import { AuthContext } from '../../context/AuthContext';
import { TodoContext } from '../../context/TodoContext';

import Colors from '../../config/Colors';
import Spinner from 'react-native-loading-spinner-overlay';
import TodoItem from '../components/TodoItem';

function HomeScreen() {

    const {logout, userInfo, isLoading} = useContext(AuthContext)
    const {todos, loadingTodos, getTodos, createTodo} = useContext(TodoContext)

    const [newTodo, setNewTodo] = useState(false)
    const [newTodoContent, setNewTodoContent] = useState('')

    const newTodoRef = useRef(null)
    const scrollRef = useRef(null)

    useEffect(() => {
        getTodos(userInfo)
    }, [])

    const CreateNewTodo = () => {
        if(newTodoContent === '') {
            setNewTodo(false)
            return
        }

        createTodo(userInfo, newTodoContent)
        setNewTodoContent('')
        newTodoRef?.current?.focus()
    }

    return (
        <TouchableWithoutFeedback style={styles.background}>
            <ScrollView ref={scrollRef} onContentSizeChange={() => {
                if(newTodo === true) {
                    scrollRef?.current?.scrollToEnd({ animated: true })
                }
            }} keyboardShouldPersistTaps='handled'>
            <View style={styles.content}>
                <Spinner visible={isLoading || loadingTodos} />
                <View style={styles.headerBar}>
                    <Text style={styles.welcomeText}>{userInfo.username}'s TODOs:</Text>
                </View>
                <Image style={styles.logo} source={require('../../assets/logo.png')} />
                <TouchableOpacity onPress={logout} style={styles.logout}><Text style={styles.link}>Logout</Text></TouchableOpacity>

                <View style={styles.todoContainer}>
                {todos.map((todo) => <TodoItem todoItem={todo} key={todo.id}/>)}
                </View>

                {newTodo ?
                <TouchableOpacity style={styles.inputArea} onPress={() => { newTodoRef.current.focus() }}>
                    <TextInput style={styles.input} autoFocus={true} placeholder='Todo...'
                        onChangeText={content => setNewTodoContent(content)}
                        onSubmitEditing={CreateNewTodo}
                        onBlur={() => setNewTodo(false)}
                        blurOnSubmit={false}
                        defaultValue={newTodoContent}
                        ref={newTodoRef} />
                    <TouchableOpacity onPress={CreateNewTodo} style={[styles.iconButton, styles.accept]}>
                        <Image source={require('../../assets/accept-icon.png')} style={styles.icon}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {setNewTodo(false)}} style={[styles.iconButton, styles.remove]}>
                        <Image source={require('../../assets/delete-icon.png')} style={styles.icon}/>
                    </TouchableOpacity>
                </TouchableOpacity>
                ://OR
                <TouchableOpacity style={styles.createTodoButton} onPress={() => setNewTodo(true)}>
                    <Text style={styles.interactableText}>Add</Text>
                </TouchableOpacity>}
            </View>
            </ScrollView>
        </TouchableWithoutFeedback>
    );

    
}

const windowHeight = Dimensions.get('window').height - (Dimensions.get('window').height * 0.2);

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        backgroundColor: Colors.Background
    },
    content: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    todoContainer: {
        flex: 1,
        width: '100%',
        marginTop: 70,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    todoContainerWhenAdding: {
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    logo: {
        width: 50,
        height: 50,
        position: 'absolute',
        top: 5,
        left: 15
    },
    logout: {
        position: 'absolute',
        right: 15,
        top: 20
    },
    headerBar: {
        width: '100%',
        height: 50,
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'center',
        top: 15
    },
    welcomeText: {
        padding: 5,
        fontSize: 20,
        fontWeight: '500'
    },
    inputArea: {
        width: '90%',
        height: 40,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        borderWidth: 0,
        borderRadius: 50,
        borderColor: Colors.Outline,
        margin: 5,
        padding: 5,
        marginBottom: windowHeight
    },
    input: {
        flex: 1,
        fontSize: 20,
        position: 'absolute',
        left: 15
    },
    link: {
        color: Colors.Blue,
        padding: 5
    },
    createTodoButton: {
        width: '90%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Green,

        borderRadius: 50
    },
    interactableText: {
        fontSize: 20,
        fontWeight: '500'
    },
    iconButton: {
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        borderRadius: 50,
        marginLeft: 5,
    },
    remove: {
        backgroundColor: Colors.Red,
    },
    accept: {
        backgroundColor: Colors.Green,
    },
    icon: {
        width: 20,
        height: 20
    },
})



export default HomeScreen;