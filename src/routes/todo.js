import express from 'express'
const router = express.Router()
import { getAllTodos,getTodoById,addTodo,updateTodo,deleteTodo } from '../controllers/todo'

router.get('/codeup', (req, res) => {
    res.send('CODEUP :)')
})

// get all todos
router.get('/', getAllTodos)

//get todo by id
router.get('/:id', getTodoById)

// insert a new data in todo
router.post('/', addTodo)
// router.post('/todos/add-comment', addComment)
   
// update an existing todo
router.put('/:id', updateTodo)
   
// delete a todo
router.delete('/:todoId', deleteTodo)
   
export default router