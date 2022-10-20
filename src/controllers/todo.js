import Todo from '../models/Todo'

const getAllTodos =  async (req, res) => {
    const _id = req.params._id
    const todos = await Todo
    .find({project: _id})
    //.exec()
    
    return res.json(todos)
}

const getCompletedTodos = async (req, res) => {
    const todos = await Todo.find({ completed: true, user: req.user.id })
}

const getTodoById = async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    .populate({ path: 'user', select: 'name' })
    
    return res.json(todo)
}

const addTodo = async (req, res) => {
    let todo = new Todo({
     title: req?.body?.title
    })
    // todo.comments.push(req.body.comment)
   
    todo = await todo.save()
   
    /* return res.json({
     success: true,
     data: todo,
     message: 'New todo adding successful!',
    }) */
    return res.json(todo)
}

const updateTodo = async (req, res) => {
    // find Id and updated it by mongoose
    // TODO: check if the id is valid

    const todo = await Todo.findByIdAndUpdate(
     req.params.id,
     {  
        title: req.body.title,
        completed: req.body.completed,
        user: req.body.user
     },
     {
      new: true,
     }
    )
   
    // if todo is not available then error or else new updated data send to user
    if (!todo)
     return res.status(404).json({
      success: false,
      data: [],
      message: 'There is no data found related to this id!',
    })

    return res.json({
     success: true,
     data: todo,
     message: 'Update successful!',
    })
} 

const deleteTodo = async (req, res) => {
    console.log('req params object here: ', req);
    // find an delete the data using moongoose & mongodb
    const {todoId} = req.params
    const deletedTodo = await Todo.findByIdAndRemove(todoId)
   
    // checking if todo not found then 404 request & if found then send the response
    if (!deletedTodo)
     return res.status(404).json({
      success: false,
      data: [],
      message: 'There is no data found related to this id!',
     })
   
    // finally response send with deleted data
    return res.json({
     success: true,
     data: deletedTodo,
     message: 'Delete successful!',
    })
}

export { getAllTodos, getTodoById, addTodo,updateTodo, deleteTodo }
