import express from 'express'
const router = express.Router()
import {getAllUsers,register, login} from '../controllers/auth'
import {getAllTeachers,createTeacher} from '../controllers/teacher'

router.get('/users', getAllUsers)

router.post('/register', register)
router.post('/login', login)
router.get('/teachers', getAllTeachers)
router.post('/teachers/signup', createTeacher)

export default router