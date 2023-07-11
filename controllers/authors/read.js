import Author from '../../models/Author.js'

export default async(req,res,next)=>{
    try {
        let consultas={};
        let ordenamiento={name:-1} //1 para ordenar ascendentemente y -1 para descendente 
        if (req.query.city) {
            consultas.city= new RegExp(req.query.city, "i");//estoy agregando la propiedad city al objeto
            //de consultas con lo que envia el cliente atravez de las queries 
            //para agregar un filtro "incluir" debemos usar expresiones regulares =RegExp
            //el primer parametro de la expresion regular es lo que quiero transformar
            //el segundo parametro es el tipo de expresion que tengo que lograr (incluir ="i")
        }
        //agregamos un nuevo condicional por si existe alguna otra consulta de otra propiedad
        if (req.query.name) {
            consultas.name= new RegExp(req.query.name, "i");
        }
        if (req.query.sort) {
            ordenamiento.name=req.query.sort;
        }
        let all = await Author 
            .find(consultas,"name -_id city user_id") //el primer parametro de la busqueda es el objeto con los filtros (consultas/ queries), segundo param son selectores(si no quiero traer se saca con "-" -_id)
            .populate("user_id", "email -_id photo role") //el 1er param es la propiedad a transoformar y el segundo los selectores
            .sort(ordenamiento);//se debe pasar el objeto de ordenamiento solo admite 1 o -1
        if(all.length>0){
            return res.status(200).json({
                response: all,
                message: 'authors found!'
            })
        }else{
            return res.status(404).json({
                response: null,
                message: 'authors not found'
            })
        }
    } catch (error) {
        next(error)
    }
}