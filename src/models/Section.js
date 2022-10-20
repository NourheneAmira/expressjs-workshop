import mongoose from 'mongoose'
const { Schema } = mongoose;

const sectionSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        lectures: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Lecture'
            }
        ],
        course: {
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }
    },
    { timestamps: true }
)

const Section = mongoose.model('Section', sectionSchema)

export default Section
