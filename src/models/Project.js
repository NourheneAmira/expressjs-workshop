import mongoose from 'mongoose'
const { Schema } = mongoose;

//degine the schema
//database level validation
const projectSchema = new Schema(
    {
    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 255,
    },
},{ timestamps: true })

const Project = mongoose.model('Project', projectSchema)

export default Project
