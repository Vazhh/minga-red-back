import { Router } from 'express'
import create from '../controllers/authors/create.js'
import read from '../controllers/authors/read.js'
import validator from '../middlewares/validator.js'
import schema_create from '../schemas/authors/create.js'
import passport from '../middlewares/passport.js'
import read_one from '../controllers/authors/read_one.js'



let authorsRouter = Router()
authorsRouter.post('/',passport.authenticate('jwt',{session:false}),validator(schema_create),create)

authorsRouter.get('/',passport.authenticate('jwt',{session:false}),read)

authorsRouter.get('/:id',passport.authenticate('jwt',{session:false}),read_one)

export default authorsRouter