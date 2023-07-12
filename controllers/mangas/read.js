import Manga from '../../models/Manga.js'

export default async(req,res,next)=>{
    try {
        let consultas={};
        let paginacion = {page:1, limit:4};
        if (req.query.page) {
            paginacion.page= req.query.page
            console.log(req)
        }
        if (req.query.title) {
            consultas.title= new RegExp(req.query.title, "i")
        }
        if (req.query.category_id) {
            consultas.category_id= req.query.category_id.split(',');
        }
        let skip = (paginacion.page>0) ?
           (paginacion.page-1)*paginacion.limit : 0
            let limit = paginacion.limit>0 ?
           paginacion.limit : 0

        let all = await Manga.find(consultas, 'title cover_photo category_id ')
            .skip(skip)
            .limit(limit)
            .sort({title:1})
            .populate('category_id', 'name', );
        if(all.length>0){
            let total = await Manga.countDocuments(consultas) //primero cuento la cantidad de doc encontrados
            let pages = Math.ceil(total/paginacion.limit) //luego calcula la cantidad de paginas que tiene el libro
            
            let prev_page = Number(paginacion.page)===1 ? null : Number(paginacion.page)-1
            let next_page = Number(paginacion.page)===pages ? null : Number(paginacion.page)+1
            
            return res.status(200).json({
                response: all,
                message: 'Mangas found!',
                prev_page,
                next_page
            })
        }else{
            return res.status(400).json({
                response: null,
                message: 'Mangas not found'
            })
        }
    } catch (error) {
        next(error)
    }
}