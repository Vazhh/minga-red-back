import Manga from "../../models/Manga";

export default async(req,res,next)=>{
 try {
   let id= req.params.id; 
   let one= await Manga.findById(id);
   
   return res.status(200).json({
     succes: true,
     response:one,
     message:['manga found']
   });

 } catch (error) {
    next(error);
 }
 
}