import { Response } from "express"
import { CreatePostModel } from "../../models/posts-models/CreatePostModel"
import { PostViewModel } from "../../models/posts-models/PostViewModel"
import { RequestWithBody, RequestWithParamsAndBody } from "../../models/requestTypes"
import { ErrorsViewModel } from "../../models/errors-models/ErrorsViewModel"
import { postsMongoRepository } from "../../repositories/posts/posts-mongo-repository"
import { postsQueryRepository } from "../../repositories/posts/posts-query-repository"
import { URIParamsBlogIdModel } from "../../models/blogs-models/URIParamsBlogIdModel"
import { CreatePostForBlogModel } from "../../models/posts-models/CreatePostForBlogModel"
import { blogsQueryRepository } from "../../repositories/blogs/blogs-query-repository"

export const createPostForBlogController = async (
    req: RequestWithParamsAndBody<URIParamsBlogIdModel, CreatePostForBlogModel>,
    res: Response<PostViewModel | null | ErrorsViewModel | { error?: string }>) => {

    const foundBlog = await blogsQueryRepository.findBlog(req.params.id)
    if (!foundBlog) {
        res.sendStatus(404)
        return
    }

    const createPost = {
        blogId: req.params.id,
        ...req.body
    }
    // const errors = inputValidation(req.body)
    // if (errors.errorsMessages.length) {
    //     res
    //         .status(400)
    //         .json(errors)
    //     return
    // }
    const createdInfo = await postsMongoRepository.createPost(createPost) //здесь createdInfo = {id: ObjectId()}
    if (!createdInfo.id) {
        res
            .status(500)
            .json({})
        return
    }
    const newPost = await postsQueryRepository.findPost(createdInfo.id.toString())
    res
        .status(201)
        .json(newPost)
}