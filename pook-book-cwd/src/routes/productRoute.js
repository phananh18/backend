import express from 'express';
import {upload,resize} from '../middlewares/uploadMiddleware'
import {CreateNewProduct, DeleteProduct, GetListProducts} from '../controllers/product'

const router = express.Router();



router.post('/',upload.single('imageUrl'),resize,CreateNewProduct)

router.get('/',GetListProducts)

router.delete('/:id',DeleteProduct)
export default router