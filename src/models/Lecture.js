import mongoose from 'mongoose'
const { Schema } = mongoose;

const lectureSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        section: {
            type: Schema.Types.ObjectId,
            ref: 'Section'
        }
    },
    { timestamps: true }
)

const Lecture = mongoose.model('Lecture', lectureSchema)

export default Lecture
