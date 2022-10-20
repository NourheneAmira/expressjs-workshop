import mongoose from 'mongoose'
const { Schema } = mongoose;

const userSchema = new Schema(
    { 
        firstName: String,
        lastName: String,
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        password: String,
        role: {
            type: String,
            default: 'user',
            enum: ['user', 'teacher', 'admin']
        },
        resetPasswordCode: {
            data: String,
            expireAt: Date
        },
    },
    { timestamps: true }
);

const User = mongoose.model('User', userSchema)

export default User