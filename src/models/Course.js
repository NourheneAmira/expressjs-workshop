import mongoose from 'mongoose'
const { Schema } = mongoose;

const courseSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
            minlength: 5,
            maxlength: 255,
        },
        teaser: String,
        description: String,
        rating: String,
        price: String,
        totalNumberOfHours: {
            type: Number,
            min: 4
        },
        teacher: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        // (sections,students) we don't need to add them in the course form, we need to push them later
        sections: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Section'
            }
        ],
        students: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
{ timestamps: true }
)

const Course = mongoose.model('Course', courseSchema)

export default Course
