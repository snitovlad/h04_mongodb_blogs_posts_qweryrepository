import { Request, Response } from 'express'
import { RequestWithParams } from '../../models/requestTypes'
import { URIParamsPostIdModel } from '../../models/posts-models/URIParamsPostIdModel'
import { PostViewModel } from '../../models/posts-models/PostViewModel'
import { postsMongoRepository } from '../../repositories/posts/posts-mongo-repository'
import { postsQueryRepository } from '../../repositories/posts/posts-query-repository'

export const findPostController = async (req: RequestWithParams<URIParamsPostIdModel>,
    res: Response<PostViewModel>) => {

    const foundPost = await postsQueryRepository.findPost(req.params.id)
    if (!foundPost) {
        res.sendStatus(404)
        return
    }
    res.json(foundPost)
}
