import {Router} from 'express'
import { GetListProducts } from '../controllers/shop.controller';

const router = Router();

// MAIN : localhost:8080/products
// 

router.get('/',GetListProducts)
router.get('/:productId',GetListProducts)


export default router