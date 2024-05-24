import { Request, Response } from 'express'
import { RequestWithParams } from '../../models/requestTypes'
import { URIParamsBlogIdModel } from '../../models/blogs-models/URIParamsBlogIdModel'
import { blogsMongoRepository } from '../../repositories/blogs/blogs-mongo-repository'

export const deleteBlogController = async (req: RequestWithParams<URIParamsBlogIdModel>,
    res: Response) => {

    const isDelete = await blogsMongoRepository.deleteBlog(req.params.id)
    if (isDelete) {
        res.sendStatus(204)
    }
    else {
        res.sendStatus(404)
    }
}
