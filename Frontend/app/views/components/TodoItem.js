import React, { useState, useRef, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, TextInput, Text } from 'react-native';
import Colors from '../../config/Colors';

import { AuthContext } from '../../context/AuthContext';
import { TodoContext } from '../../context/TodoContext';

function TodoItem({ todoItem }) {
    
    const {userInfo} = useContext(AuthContext)
    const {markTodo, editTodo, removeTodo} = useContext(TodoContext)

    const [edit, setEdit] = useState(false)
    const [originalValue, setOriginalValue] = useState(todoItem?.content)
    const [currentValue, setCurrentValue] = useState(todoItem?.content)

    const inputFieldRef = useRef(null)

    const BeginEdit = () => {
        setEdit(true)
        setOriginalValue(currentValue)
    }

    const EndEdit = () => {
        if(edit === false) return

        setEdit(false)
        setCurrentValue(originalValue)
        inputFieldRef?.current?.blur()
    }

    const ApplyEdit = () => {
        setEdit(false)
        setOriginalValue(currentValue)
        inputFieldRef?.current?.blur()

        editTodo(userInfo, todoItem.id, currentValue)
    }

    return (
        <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => markTodo(userInfo, todoItem.id, !todoItem.completed)} style={styles.checkBox}>
                {todoItem?.completed ? <View style={styles.checkBoxCheck}></View> : ''}
            </TouchableOpacity>
            {todoItem.completed ?
            <Text style={styles.doneText}>{todoItem.content}</Text>
            :
            <TextInput
            style={styles.todoText}
            onFocus={BeginEdit}
            onBlur={EndEdit}
            onSubmitEditing={ApplyEdit}
            onChangeText={content => setCurrentValue(content)}
            defaultValue={currentValue}
            ref={inputFieldRef}
            />
            }
            
            {edit ?
            <>
            <TouchableOpacity onPress={ApplyEdit} style={[styles.iconButton, styles.accept]}>
                <Image source={require('../../assets/accept-icon.png')} style={styles.icon}/>
            </TouchableOpacity>
            <TouchableOpacity onPress={EndEdit} style={[styles.iconButton, styles.remove]}>
                <Image source={require('../../assets/delete-icon.png')} style={styles.icon}/>
            </TouchableOpacity>
            </>    
            :<TouchableOpacity onPress={() => removeTodo(userInfo, todoItem.id)} style={[styles.iconButton, styles.remove]}>
                <Image source={require('../../assets/delete-icon.png')} style={styles.icon}/>
            </TouchableOpacity>}
        </View>
    )
}

const styles = StyleSheet.create({
    todoItem: {
        flexDirection: 'row',
        width: '90%',
        borderColor: Colors.Outline,
        borderWidth: 1,
        borderRadius: 50,

        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 5,
        padding: 5
    },
    checkBox: {
        width: 25,
        height: 25,
        margin: 5,
        padding: 2,
        borderWidth: 1,
        borderRadius: 6
    },
    checkBoxCheck: {
        flex: 1,
        backgroundColor: Colors.Blue,
        borderRadius: 5
    },
    todoText: {
        fontSize: 20,
        flex: 1,
    },
    doneText: {
        fontSize: 20,
        flex: 1,
        textDecorationLine: 'line-through'
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

export default TodoItem;