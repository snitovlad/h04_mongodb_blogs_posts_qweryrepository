import { Router } from 'express'
import { findAllPostsController } from '../controllers/posts/findAllPostsController';
import { createPostController } from '../controllers/posts/createPostController';
import { findPostController } from '../controllers/posts/findPostController';
import { deletePostController } from '../controllers/posts/deletePostController';
import { updatePostController } from '../controllers/posts/updatePostController';
import {
    inputBlogIdPostValidator, inputContentPostValidator, inputShortDescriptionPostValidator,
    inputTitlePostValidator
} from '../middlewares/post-validation-middleware';
import { inputCheckErrorsMiddleware } from '../middlewares/input-check-errors-middleware';
import { authMiddleware } from '../middlewares/auth-middleware';
import { inputIdValidator } from '../middlewares/input-id-validator';
import { inputPageNumberQueryValidator, inputPageSizeQueryValidator, inputSortByQueryValidator, inputSortDirectionQueryValidator } from '../middlewares/inputQueryValidation';


export const postsRouter = Router()

postsRouter.get('/',
    inputSortByQueryValidator(),
    inputSortDirectionQueryValidator(),
    inputPageNumberQueryValidator(),
    inputPageSizeQueryValidator(),
    inputCheckErrorsMiddleware,
    findAllPostsController)

postsRouter.post('/',
    authMiddleware,
    inputTitlePostValidator(),
    inputShortDescriptionPostValidator(),
    inputContentPostValidator(),
    inputBlogIdPostValidator(),
    inputCheckErrorsMiddleware,
    createPostController)

postsRouter.get('/:id',
    inputIdValidator(),
    inputCheckErrorsMiddleware,
    findPostController)

postsRouter.delete('/:id',
    authMiddleware,
    inputIdValidator(),
    inputCheckErrorsMiddleware,
    deletePostController)

postsRouter.put('/:id',
    authMiddleware,
    inputIdValidator(),
    inputTitlePostValidator(),
    inputShortDescriptionPostValidator(),
    inputContentPostValidator(),
    inputBlogIdPostValidator(),
    inputCheckErrorsMiddleware,
    updatePostController)


