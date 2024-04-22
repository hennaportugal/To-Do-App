import { useEffect, useState } from 'react'
import Header from './component/Header'
import axios from 'axios'

const App = () => {
    const [editMode, setEditMode] = useState(false)
    const [list, setList] = useState([])
    const [task, setTask] = useState('')
    const [dateCreated, setDateCreated] = useState('')
    const [userId, setUserId] = useState('')


    const showTodos = async () => {
        try {
            const { data } = await axios.get('/api/show/todos')
            setList(data)
        } catch (error) {
            console.log(error)
        }
    }

    const addTodo = async (e) => {
        e.preventDefault()

        try {
            const newTodo = await axios.post('/api/create/list', { task, dateCreated })
            if (newTodo.status === 200) {
                setTask('')
                setDateCreated('')
                showTodos()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const deleteTodo = async (id) => {

        try {
            const todoToDelete = await axios.delete(`/api/delete/todo/${id}`)
            if (todoToDelete.status === 200) {
                showTodos()
            }
        } catch (error) {
            console.log(error)
        }
    }

    const showSingleTodo = async (id) => {
        setEditMode(true)

        try {
            const { data } = await axios.get(`/api/todo/${id}`)
            setTask(data.task)
            setDateCreated(data.dateCreated)
            setUserId(data.id)
        } catch (error) {
            console.log(error)
        }
    }

    const updateTodo = async (e) => {
        e.preventDefault()

        try {
            const todoToUpdate = await axios.put(`/api/update/todo/${userId}`, {task, dateCreated})
            console.log(todoToUpdate)
            if (todoToUpdate.status === 200) {
                console.log(`ID ${userId}`)
                setEditMode(false)
                setTask('')
                setDateCreated('')
                showTodos()
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        showTodos()
    }, [])
    return (
        <>
            <Header />
            <div className="container">
                <div className="form" style={{ paddingBottom: "50px", paddingTop: "50px" }}>
                    <form onSubmit={editMode ? updateTodo : addTodo}>
                        <div className="form-wrapper" style={{ display: "flex", justifyContent: "space-between" }}>
                            <div style={{ flex: 1, marginRight: "10px" }}>
                                <input onChange={(e) => setTask(e.target.value)} value={task} className="form-control" type="text" placeholder="Task" name="task"></input>
                            </div>
                            <div style={{ flex: 1 }}>
                                <input onChange={(e) => setDateCreated(e.target.value)} value={dateCreated} className="form-control" type="text" placeholder="Date (YYYY-MM-DD)" name="dateCreated"></input>
                            </div>
                            {
                                editMode ?
                                    <button type='submit' style={{ width: "200px", marginLeft: "10px" }} className='btn btn-primary'>Update</button>
                                    :
                                    <button type='submit' style={{ width: "200px", marginLeft: "10px" }} className='btn btn-success'>Add task</button>
                            }
                        </div>
                    </form>
                </div>

                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Task</th>
                            <th scope="col">Date</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list && list.map(val => (
                                <tr key={val.id} >
                                    <th scope="row">{val.id}</th>
                                    <td>{val.task}</td>
                                    <td>{val.dateCreated}</td>
                                    <td>
                                        <i onClick={() => showSingleTodo(val.id)} className="fa-solid fa-pen-to-square" style={{ color: "green", cursor: "pointer", marginRight: "25px" }} ></i>
                                        <i onClick={() => deleteTodo(val.id)} style={{ color: "red", cursor: "pointer" }} className="fa-solid fa-trash-can"></i>
                                    </td>

                                </tr>

                            ))
                        }

                    </tbody>
                </table>
            </div>
        </>
    )
}

export default App