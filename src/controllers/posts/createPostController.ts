import { Request, Response } from 'express'
import { ErrorsViewModel } from '../../models/errors-models/ErrorsViewModel'
import { RequestWithBody } from '../../models/requestTypes'
import { CreatePostModel } from '../../models/posts-models/CreatePostModel'
import { PostViewModel } from '../../models/posts-models/PostViewModel'
import { postsMongoRepository } from '../../repositories/posts/posts-mongo-repository'
import { postsQueryRepository } from '../../repositories/posts/posts-query-repository'

// const inputValidation = (post: CreatePostModel) => {
//     const errors: ErrorsViewModel = {
//         errorsMessages: []
//     }
//     if (!post.title || post.title.length > 30 || typeof post.title !== "string" || !post.title.trim()) {
//         errors.errorsMessages.push(
//             {
//                 message: "Error!! Invalid title",
//                 field: 'title'
//             }
//         )
//     }
//     if (!post.shortDescription || post.shortDescription.length > 100 || typeof post.shortDescription !== "string" || !post.shortDescription.trim()) {
//         errors.errorsMessages.push(
//             {
//                 message: 'Error!! Invalid shortDescription',
//                 field: 'shortDescription'
//             }
//         )
//     }
//     if (!post.content || post.content.length > 1000 || typeof post.content !== "string" || !post.content.trim()) {
//         errors.errorsMessages.push(
//             {
//                 message: 'Error!! Invalid content',
//                 field: 'content'
//             }
//         )
//     }
//     if (!post.blogId || /*post.blogId.length > 100 || */typeof post.blogId !== "string" || !post.blogId.trim()) {
//         errors.errorsMessages.push(
//             {
//                 message: 'Error!! Invalid blogId',
//                 field: 'blogId'
//             }
//         )
//     }
//     return errors
// }


export const createPostController = async (
    req: RequestWithBody<CreatePostModel>,
    res: Response<PostViewModel | null | ErrorsViewModel | { error?: string }>) => {

    // const errors = inputValidation(req.body)
    // if (errors.errorsMessages.length) {
    //     res
    //         .status(400)
    //         .json(errors)
    //     return
    // }
    const createdInfo = await postsMongoRepository.createPost(req.body) //здесь createdInfo = {id: ObjectId()}
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
