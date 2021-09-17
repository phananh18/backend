import express from 'express'
import { GetListAuthors,CreateNewAuthor, DeleteNewAuthor, UpdateNewAuthor } from '../controllers/author';


const router = express.Router();

// CRUD 


// /api/v1/author

router.get('/:id',GetListAuthors);
router.post('/',CreateNewAuthor);
router.put('/:id',UpdateNewAuthor);
router.delete('/:id',DeleteNewAuthor);
export default router;