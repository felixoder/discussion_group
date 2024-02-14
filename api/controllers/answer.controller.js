import Answer from "../models/answer.model.js";
import { errorHandler } from "../utils/error.js";
export const createAnswer = async(req,res,next)=>{
    try {
        const {content , postId, userId} = req.body;
        if(userId !== req.user.id){
            return next(errorHandler(403 , 'You are not allowed to post Answer'))

        }

        const newAnswer = new Answer({
            content , postId , userId
        })
        await newAnswer.save();

        res.status(200).json(newAnswer)
    } catch (error) {
        next(error)
    }
}




export const getPostAnswers = async (req , res , next)=>{
    try {
        const answers = await Answer.find({postId:req.params.postId}).sort({
            createdAt: -1
        });
        res.status(200).json(answers)

    } catch (error) {
        next(error)
    }

}

