import { Request, Response } from 'express'
import { RequestWithParamsAndBody } from '../../models/requestTypes'
import { URIParamsPostIdModel } from '../../models/posts-models/URIParamsPostIdModel'
import { UpdatePostModel } from '../../models/posts-models/UpdatePostModel'
import { postsMongoRepository } from '../../repositories/posts/posts-mongo-repository'

// const inputValidation = (post: UpdatePostModel) => {
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

export const updatePostController = async (req: RequestWithParamsAndBody<URIParamsPostIdModel, UpdatePostModel>,
    res: Response) => {

    // const errors = inputValidation(req.body)
    // if (errors.errorsMessages.length) {
    //     res
    //         .status(400)
    //         .json(errors)
    //     return
    // }

    const isUpdate = await postsMongoRepository.updatePost(req.params.id, req.body)
    if (!isUpdate) {
        res.sendStatus(404)
        return
    }
    res
        .sendStatus(204)
}
