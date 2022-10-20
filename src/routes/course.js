import express from 'express'
const router = express.Router()
import { getAllCourses,getCourseById,addCourse, deleteCourse,updateCourse } from '../controllers/course'

router.get('/', getAllCourses)

router.get('/:id', getCourseById)

router.post('/', addCourse)

router.put('/:id', updateCourse)
   
router.delete('/:id', deleteCourse)
   
   
export default router