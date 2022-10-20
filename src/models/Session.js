import mongoose from 'mongoose'
const { Schema } = mongoose;

const sessionSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        start: Date,
        end: Date,
        status: {
            type: String,
            default: 'open',
            enum: ['open', 'closed', 'closed']
        },
    },
    { timestamps: true }
)

const Session = mongoose.model('Session', sessionSchema)

export default Session
