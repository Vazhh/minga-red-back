import Manga from "../../models/Manga.js";

export default async(req,res,next)=>{
 try {
   let id= req.params.id;
   console.log(id) 
   let one= await Manga.findById(id, 'title cover_photo description category_id -_id').populate('category_id', 'name -_id' );
   
   return res.status(200).json({
     success: true,
     response:one,
     message:['manga found']
   });

 } catch (error) {
    next(error);
 }
 
}