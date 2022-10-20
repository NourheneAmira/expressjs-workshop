import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import User from '../models/User'
import nodemailer from "nodemailer";

const getAllUsers = async (req, res) => {
    const users = await User.find()

    return res.json(users)
}



const register = async (req, res) => {
    const { firstName, lastName, email, password, role } = req.body

    // Check if user already exists
    const userExits = await User.findOne({ email })

    if (userExits) {
        return res.status(400).json({ msg: 'User already exists' })
    }

    // check if password is valid &  and more than 9 caracters
    if (!password || password.length < 9) {
        return res.status(400).json({ msg: 'Password must be at least 9 characters' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({ firstName, lastName, email, role, password: hashedPassword })

    //generate jwt token
    const token = jwt.sign(
        { user_id: user.id, email: user.email },
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



const login = async (req, res) => {
    const { email, password } = req.body

    // Check if user already exists
    const userExits = await User.findOne({ email })
    if (!userExits) {
        return res.status(400).json({ msg: 'the User does not exists' })
    }

    // check if password is valid &  and more than 9 caracters
    if (!password || password.length < 9) {
        return res.status(400).json({ msg: 'Password must be at least 9 characters' })
    }


    const isMatch = await bcrypt.compare(password, userExits.password)
    if (!isMatch) {
        return res.status(400).json({ msg: 'Email or Password is incorrect' })
    }

    //generate jwt token
    const token = jwt.sign(
        { user_id: userExits.id, email: userExits.email },
        process.env.TOKEN_KEY,
        { expiresIn: '24h' }
    )

    // optionnelly send user and token
    res.cookie('token', token,
        {
            httpOnly: true,
            secure: true
        }
    )

    return res.send(
        {
            user: {
                _id: userExits._id,
                firstName: userExits.firstName,
                lastName: userExits.lastName,
                email: userExits.email,
                role: userExits.role,
            },
            token
        }
    )
}


export { getAllUsers, register, login }