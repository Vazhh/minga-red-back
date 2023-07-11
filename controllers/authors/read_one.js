import Author from "../../models/Author.js";


export default async (req, res, next)=>{
try {
    console.log(req.params.id)
    let id= req.params.id; //las consultas(opcionales) van con query y los parametros unicos y obligatorios van con params 
let one = await Author.findById(id)
return res.status(200).json({
    success: true,
    response: one,
})
} catch (error) {
    next(error)
}
}