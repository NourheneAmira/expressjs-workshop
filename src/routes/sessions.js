import express from 'express'
const router = express.Router()
import { getAllSessions, getSessionById, addSession,updateSession, deleteSession } from '../controllers/sessions'

router.get('/', getAllSessions)

router.get('/:id', getSessionById)

router.post('/', addSession)
   
router.put('/:id', updateSession)
   
router.delete('/:id', deleteSession)
   
export default router