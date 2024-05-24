import { Request, Response } from 'express'
import { RequestWithParams } from '../../models/requestTypes'
import { URIParamsPostIdModel } from '../../models/posts-models/URIParamsPostIdModel'
import { postsMongoRepository } from '../../repositories/posts/posts-mongo-repository'


export const deletePostController = async (req: RequestWithParams<URIParamsPostIdModel>,
    res: Response) => {

    const isDelete = await postsMongoRepository.deletePost(req.params.id)
    if (!isDelete) {
        res.sendStatus(404)
    } else {
        res.sendStatus(204)
    }
}
