import express from "express";
import {CreateNewPublisher, DeletePublisher, GetPublisher, UpdatePublisher} from '../controllers/publisher'


const router=express.Router();
router.get('/:id',GetPublisher)
router.post('/',CreateNewPublisher)
router.put('/:id',UpdatePublisher)
router.delete('/:id',DeletePublisher)

export default router;