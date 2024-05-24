import { Request, Response } from 'express'
import { RequestWithParamsAndBody } from '../../models/requestTypes'
import { URIParamsBlogIdModel } from '../../models/blogs-models/URIParamsBlogIdModel'
import { UpdateBlogModel } from '../../models/blogs-models/UpdateBlogModel'
import { blogsMongoRepository } from '../../repositories/blogs/blogs-mongo-repository'
import { ObjectId } from 'mongodb'

// const inputValidation = (blog: CreateBlogModel) => {
//     const errors: ErrorsViewModel = {
//         errorsMessages: []
//     }
//     if (!blog.name || blog.name.length > 15 || typeof blog.name !== "string" || !blog.name.trim()) {
//         errors.errorsMessages.push(
//             {
//                 message: "Error!! Invalid name",
//                 field: 'name'
//             }
//         )
//     }
//     if (!blog.description || blog.description.length > 500 || typeof blog.description !== "string" || !blog.description.trim()) {
//         errors.errorsMessages.push(
//             {
//                 message: 'Error!! Invalid description',
//                 field: 'description'
//             }
//         )
//     }
//     if (!blog.websiteUrl || blog.websiteUrl.length > 100 || typeof blog.websiteUrl !== "string"
//         || !blog.websiteUrl.trim() || !websiteUrlRegex.test(blog.websiteUrl)) {
//         errors.errorsMessages.push(
//             {
//                 message: 'Error!! Invalid websiteUrl',
//                 field: 'websiteUrl'
//             }
//         )
//     }
//     return errors
// }

export const updateBlogController = async (
    req: RequestWithParamsAndBody<URIParamsBlogIdModel, UpdateBlogModel>,
    res: Response) => {

    // const errors = inputValidation(req.body)
    // if (errors.errorsMessages.length) {
    //     res
    //         .status(400)
    //         .json(errors)
    //     return
    // }
    const isUpdate = await blogsMongoRepository.updateBlog(req.params.id, req.body)
    if (!isUpdate) {
        res.sendStatus(404)
        return
    } else {
        res.sendStatus(204)
    }
}
