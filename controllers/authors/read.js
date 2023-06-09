import Author from '../../models/Author.js'

export default async(req,res,next)=>{
    try {
        let all = await Author.find()
        if(all){
            return res.status(200).json({
                response: all,
                message: 'authors found!'
            })
        }else{
            return res.status(400).json({
                response: null,
                message: 'authors not found'
            })
        }
    } catch (error) {
        next(error)
    }
}