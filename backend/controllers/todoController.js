const db = require('../db/database')

exports.createDB = (req, res) => {
    let q = 'CREATE DATABASE todolist'

    db.query(q, (err) => {
        if (err) throw err
        return res.status(201).json("created DB")
    })
}

exports.createTable = (req, res) => {
    let q = 'CREATE TABLE todo(id int AUTO_INCREMENT, task VARCHAR(255), dueDate VARCHAR(255), PRIMARY KEY(id))'

    db.query(q, (err) => {
        if (err) throw err
        return res.status(201).json("created Table")
    })
}

exports.createList = (req, res) => {
    let q = 'INSERT INTO todo SET ?'

    const { task, dueDate } = req.body

    db.query(q, { task, dueDate }, (err, result) => {
        if (err) return res.json(err)
        return res.status(200).json(result)
    })
}

exports.showTodos = (req, res) => {
    let q = 'SELECT * FROM todo'

    db.query(q, (err, result) => {
        if (err) return res.json(err)
        return res.status(200).json(result)
    })
}

exports.showSingleTodo = (req, res) => {
    let q = `SELECT * FROM todo WHERE id=${req.params.id}`

    db.query(q, (err, result) => {
        if (err) return res.json(err)
        return res.status(200).json(result[0])
    })
}

exports.updateTodo = (req, res) => {
    const { task, dueDate } = req.body

    let q = `UPDATE todo SET ? WHERE id=${req.params.id}`

    db.query(q, { task, dueDate }, (err, result) => {
        if (err) return res.json(err)
        return res.status(200).json(result)
    })
}

exports.deleteSingleTodo = (req, res) => {
    let q = `DELETE FROM todo WHERE id=${req.params.id}`

    db.query(q, (err, result) => {
        if (err) return res.json(err)
        return res.status(200).json({ data: "task deleted" })
    })
}