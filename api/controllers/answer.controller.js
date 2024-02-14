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


export const likeAnswer = async (req , res , next)=>{
    try {
        const answer = await Answer.findById(req.params.answerId);
        if(!answer){
            return next(errorHandler(404 , 'Cannot found'))

        }
        const userIndex = answer.likes.indexOf(req.user.id);
        if(userIndex === -1){
            answer.numberOfLikes +=1 ;

            answer.likes.push(req.user.id);
            

        }
        else{
            answer.numberOfLikes -= 1;
            answer.likes.splice(userIndex, 1);
        }
        await answer.save();
        res.status(200).json(answer)
    } catch (error) {
        next(error)
    }
}


export const getAnswers = async (req, res, next) => {
    if (!req.user)
      return next(errorHandler(403, 'You are not allowed to get all answers'));
    try {
      const startIndex = parseInt(req.query.startIndex) || 0;
      const limit = parseInt(req.query.limit) || 9;
      const sortDirection = req.query.sort === 'desc' ? -1 : 1;
      const answers = await Answer.find()
        .sort({ createdAt: sortDirection })
        .skip(startIndex)
        .limit(limit);
      const totalAnswers = await Answer.countDocuments();
      const now = new Date();
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
      );
      const lastMonthAnswers = await Answer.countDocuments({
        createdAt: { $gte: oneMonthAgo },
      });
      res.status(200).json({ answers, totalAnswers, lastMonthAnswers });
    } catch (error) {
      next(error);
    }
  };