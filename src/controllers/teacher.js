import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import User from '../models/User'
import nodemailer from "nodemailer";

const getAllTeachers = async (req, res) => {
    const teachers = await User
    .find({ role: 'teacher' })
    .select('-password')
    return res.send(teachers)
}

const createTeacher = async (req, res) => {
    const { firstName, lastName, email,password } = req.body

    // Check if user already exists
    const userExits = await User.findOne({ email })
    
    if(userExits) {
        return res.status(400).json({ msg: 'User already exists' })
    }

    // check if password is valid &  and more than 9 caracters
    if(!password || password.length < 9) {
        return res.status(400).json({ msg: 'Password must be at least 9 characters' })
    }
    
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ firstName,lastName, email, password: hashedPassword, role: 'teacher' })

    //generate jwt token
    const token = jwt.sign(
        {user_id: user.id, email: user.email},
        process.env.TOKEN_KEY,
        { expiresIn: '24h' }
    )

    const transporter = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "1190c1f01a2671",
          pass: "ce245b466008af"
        }
    });

    let info = await transporter.sendMail({
        from: '"CODEUP 👻" <contact@codeup.tn>', // sender address
        to: user.email, // list of receivers
        subject: "Welcome to CODEUP", // Subject line
        text: "Welcome", // plain text body
        html: `
            <b>Welcome ${user.firstName} ${user.lastName}</b>
        `, // html body
      });

    return res.send(
        { 
            user,
            token
        }
    )
}

export {getAllTeachers,createTeacher}