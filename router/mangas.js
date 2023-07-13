import { Router } from 'express'
import read from '../controllers/mangas/read.js'
import create from '../controllers/mangas/create.js'
import validator from '../middlewares/validator.js'
import MangaSchema from '../schemas/mangas/create.js'
import passport from 'passport'
import has_permition from '../middlewares/has_permition.js'
import isActive from '../middlewares/isActive.js' 
import read_one from '../controllers/mangas/read_one.js'

let mangasRouter = Router()

mangasRouter.post('/',
    passport.authenticate('jwt',{session:false}),
    validator(MangaSchema),
    has_permition,
    isActive,
    create)
mangasRouter.get('/',read)

mangasRouter.get('/:id',passport.authenticate('jwt',{session:false}), read_one)

export default mangasRouter