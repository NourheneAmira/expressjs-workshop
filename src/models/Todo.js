import Joi from 'joi';
import mongoose from 'mongoose'
const { Schema } = mongoose;

//degine the schema
//database level validation
const todoSchema = new Schema(
    {
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    project:{
        type: Schema.Types.ObjectId,
        ref: 'Project',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comments: [
        {
            context: {
                type: String,
            },
            user: {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        }
    ]
},{ timestamps: true })



const TodoModel = mongoose.model('Todo', todoSchema)
//named export
export const firstName = 'wael'

export default TodoModel
