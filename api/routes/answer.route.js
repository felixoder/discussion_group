import express from 'express'
import {verifyToken} from '../utils/verifyUser.js'
import { createAnswer, getPostAnswers, likeAnswer } from '../controllers/answer.controller.js';

const router = express.Router();
router.post('/create',verifyToken , createAnswer)
router.get('/getPostAnswers/:postId' , getPostAnswers);
router.put('/likeAnswer/:answerId' , verifyToken , likeAnswer);
export default router;