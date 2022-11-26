import { Router } from 'express';
import { bookController } from '../controller';
import { asyncHandler } from '../utils';

export const bookRouter = Router();

bookRouter.get('/', asyncHandler(bookController.getBooks));
bookRouter.get('/:id', asyncHandler(bookController.getBookInfo));
bookRouter.post('/', asyncHandler(bookController.addBook));
bookRouter.delete('/:id', asyncHandler(bookController.dropBook));
bookRouter.put('/:id', asyncHandler(bookController.editBook));
