const express = require("express")

const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
const { v4: uuid } = require('uuid');

const app = express()
const port = 3000

const saltRounds = 10

let users = []

let todos = []

const GetUserIndex = (username) => {
    for (let i = 0; i < users.length; i++) {
        if(users[i].username === username) {
            return i
        }
    }
    return -1
}

const CreateUserTodos = (userID) => {
    const newTodos = {
        userID,
        todos: []
    }

    todos.push(newTodos)

    return GetUserTodosIndex(userID)
}

const GetUserTodosIndex = (userID) => {
    for (let i = 0; i < todos.length; i++) {
        if(todos[i].userID === userID) {
            return i
        }
    }

    return -1
}

const GetOrCreateUserTodosIndex = (userID) => {
    let index = GetUserTodosIndex(userID)
    if(index === -1) {
        index = CreateUserTodos(userID)
    }

    return index
}

const GetTodoItemIndex = (todosIndex, todoID) => {
    for (let i = 0; i < todos[todosIndex].todos.length; i++) {
        if(todos[todosIndex].todos[i].id === todoID) {
            return i
        }
    }

    return -1
}

const RemoveTodoItem = (todosIndex, todoItemIndex) => {
    let temp = todos[todosIndex].todos
    let newTodos = []

    for (let i = 0; i < temp.length; i++) {
        if(i !== todoItemIndex) {
            newTodos.push(temp[i])
        }
    }

    return newTodos
}

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.get('/api/users', (req, res) => {
    res.json(users)
})

app.get('/api/todos', (req, res) => {
    res.json(todos)
})

app.get('/api/todos/:username', (req, res) => {
    const userIndex = GetUserIndex(req.params.username)

    if(userIndex === -1) {
        res.json({ message: 'No User With That Name.' })
        return
    }

    const todosIndex = GetOrCreateUserTodosIndex(users[userIndex].id)
    res.json(todos[todosIndex].todos)
})

app.post('/api/todos/create', (req, res) => {
    const data = req.body
    const userIndex = GetUserIndex(data.username)

    if(userIndex === -1) {
        res.json({ message: 'No User With That Name.' })
        return
    }

    if(users[userIndex].auth.key !== data.authKey) {
        res.json({ message: 'Auth Key Mismatch!' })
        return
    }

    const todoIndex = GetOrCreateUserTodosIndex(users[userIndex].id)

    if(todoIndex === -1) {
        res.json({ message: 'Unknown Error Occured.' })
        return
    }

    const todoItem = {
        id: uuid(),
        completed: false,
        content: data.content
    }

    todos[todoIndex].todos.push(todoItem)
    res.json(todos[todoIndex].todos)
})

app.post('/api/todos/mark', (req, res) => {
    const data = req.body
    const userIndex = GetUserIndex(data.username)

    if(userIndex === -1) {
        res.json({ message: 'No User With That Name.' })
        return
    }

    if(users[userIndex].auth.key !== data.authKey) {
        res.json({ message: 'Auth Key Mismatch!' })
        return
    }

    const todoIndex = GetUserTodosIndex(users[userIndex].id)

    if(todoIndex === -1) {
        res.json({ message: 'No Todos Found...' })
        return
    }

    const todoItemIndex = GetTodoItemIndex(todoIndex, data.id)

    if(todoItemIndex === -1) {
        res.json({ message: 'No Todo With That ID Found.' })
        return
    }

    todos[todoIndex].todos[todoItemIndex].completed = data.completed
    
    res.json(todos[todoIndex].todos)
})

app.post('/api/todos/edit', (req, res) => {
    const data = req.body
    const userIndex = GetUserIndex(data.username)

    if(userIndex === -1) {
        res.json({ message: 'No User With That Name.' })
        return
    }

    if(users[userIndex].auth.key !== data.authKey) {
        res.json({ message: 'Auth Key Mismatch!' })
        return
    }

    const todoIndex = GetUserTodosIndex(users[userIndex].id)

    if(todoIndex === -1) {
        res.json({ message: 'No Todos Found...' })
        return
    }

    const todoItemIndex = GetTodoItemIndex(todoIndex, data.id)

    if(todoItemIndex === -1) {
        res.json({ message: 'No Todo With That ID Found.' })
        return
    }

    todos[todoIndex].todos[todoItemIndex].content = data.content
    
    res.json(todos[todoIndex].todos)
})

app.post('/api/todos/delete', (req, res) => {
    const data = req.body
    const userIndex = GetUserIndex(data.username)

    if(userIndex === -1) {
        res.json({ message: 'No User With That Name.' })
        console.log(data.username)
        return
    }

    if(users[userIndex].auth.key !== data.authKey) {
        res.json({ message: 'Auth Key Mismatch!' })
        return
    }

    const todosIndex = GetUserTodosIndex(users[userIndex].id)

    if(todosIndex === -1) {
        res.json({ message: 'No Todos Found...' })
        return
    }

    const todoItemIndex = GetTodoItemIndex(todosIndex, data.id)

    if(todoItemIndex === -1) {
        res.json({ message: 'No Todo With That ID Found.' })
        return
    }

    const temp = RemoveTodoItem(todosIndex, todoItemIndex)

    const tempOverall = todos[todosIndex]
    tempOverall.todos = temp
    todos[todosIndex] = tempOverall

    res.json(todos[todosIndex].todos)
})

app.post('/api/user/register', (req, res) => {
    const data = req.body

    bcrypt.hash(data.password, saltRounds, (err, hash) => {
        let newUser = {
            id: uuid(),
            username: data.username,
            hash,
            auth: {
                loggedIn: true,
                key: uuid()
            }
        }

        users.push(newUser)

        let returningUser = {
            authKey: newUser.auth.key,
            username: newUser.username,
        }
        res.json(returningUser)
    })
})

app.post('/api/user/login', (req, res) => {
    const data = req.body
    
    let userIndex = GetUserIndex(data.username)

    if(userIndex === -1) {
        res.json({ authKey: '', reason: 'invalid username' })
        return
    }

    bcrypt.compare(data.password, users[userIndex].hash, (err, result) => {
        if(result === true){
            let temp = users[userIndex]
            temp.auth.key = uuid()
            temp.auth.loggedIn = true
            users[userIndex] = temp
            
            let returnedUser = {
                authKey: users[userIndex].auth.key,
                username: users[userIndex].username
            }

            res.json(returnedUser)
            return
        }
        
        res.json({ authKey: '', reason: 'invalid password' })
    })
})

app.post('/api/user/logout', (req, res) => {
    const data = req.body
    const userIndex = GetUserIndex(data.username)

    if(users[userIndex].auth.key === data.authKey) {
        users[userIndex].auth.key = ''
        users[userIndex].auth.loggedIn = false

        res.json({ message: 'Successfully Logged Out.' })
        return
    }

    res.json({ message: 'Failed To Logout.' })
})



app.listen(port, () => {
    console.log(`API Started on Port: ${port}`);
})