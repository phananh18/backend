import express from 'express'
import {GetListCategories,CreateNewCategories,UpdateListCategories,DeleteListCategories} from '../controllers/category'

const router=express.Router();

router.get('/:id',GetListCategories)
router.post('/',CreateNewCategories)
router.put('/:id',UpdateListCategories)
router.delete('/:id',DeleteListCategories)



export default router