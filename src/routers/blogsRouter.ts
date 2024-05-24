import { createBlogController } from '../controllers/blogs/createBlogController';
import { findBlogController } from '../controllers/blogs/findBlogController';
import { updateBlogController } from '../controllers/blogs/updateBlogController';
import { Router } from 'express'
import { inputDescriptionBlogValidator, inputNameBlogValidator, inputWebsiteUrlBlogValidator } from '../middlewares/blog-validation-middleware';
import { inputCheckErrorsMiddleware } from '../middlewares/input-check-errors-middleware';
import { authMiddleware } from '../middlewares/auth-middleware';
import { deleteBlogController } from '../controllers/blogs/deleteBlogController';
import { inputIdValidator } from '../middlewares/input-id-validator';
import { findAllBlogsController } from '../controllers/blogs/findAllBlogsController';
import { findAllPostsOfBlogController } from '../controllers/blogs/findAllPostsOfBlogController';
import { createPostForBlogController } from '../controllers/blogs/createPostsForBlogController';
import {
    inputPageNumberQueryValidator, inputPageSizeQueryValidator, inputSearchNameTermQueryValidator, inputSortByQueryValidator,
    inputSortDirectionQueryValidator
} from '../middlewares/inputQueryValidation';
import { inputContentPostValidator, inputShortDescriptionPostValidator, inputTitlePostValidator } from '../middlewares/post-validation-middleware';


export const blogsRouter = Router()

blogsRouter.get('/',
    inputSearchNameTermQueryValidator(),
    inputSortByQueryValidator(),
    inputSortDirectionQueryValidator(),
    inputPageNumberQueryValidator(),
    inputPageSizeQueryValidator(),
    inputCheckErrorsMiddleware,
    findAllBlogsController)

blogsRouter.get('/:id',
    inputIdValidator(),
    inputCheckErrorsMiddleware,
    findBlogController)

blogsRouter.get('/:id/posts',
    inputIdValidator(),
    inputSortByQueryValidator(),
    inputSortDirectionQueryValidator(),
    inputPageNumberQueryValidator(),
    inputPageSizeQueryValidator(),
    inputCheckErrorsMiddleware,
    findAllPostsOfBlogController)


blogsRouter.post('/',
    authMiddleware,
    inputNameBlogValidator(),
    inputDescriptionBlogValidator(),
    inputWebsiteUrlBlogValidator(),
    inputCheckErrorsMiddleware,
    createBlogController)

blogsRouter.post('/:id/posts',
    authMiddleware,
    inputIdValidator(),
    inputTitlePostValidator(),
    inputShortDescriptionPostValidator(),
    inputContentPostValidator(),
    inputCheckErrorsMiddleware,
    createPostForBlogController)



blogsRouter.delete('/:id',
    authMiddleware,
    inputIdValidator(),
    inputCheckErrorsMiddleware,
    deleteBlogController)

blogsRouter.put('/:id',
    authMiddleware,
    inputIdValidator(),
    inputNameBlogValidator(),
    inputDescriptionBlogValidator(),
    inputWebsiteUrlBlogValidator(),
    inputCheckErrorsMiddleware,
    updateBlogController)

// ...
