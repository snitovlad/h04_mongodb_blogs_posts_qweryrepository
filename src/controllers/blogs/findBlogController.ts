import { Request, Response } from 'express'
import { RequestWithParams } from '../../models/requestTypes'
import { URIParamsBlogIdModel } from '../../models/blogs-models/URIParamsBlogIdModel'
import { BlogViewModel } from '../../models/blogs-models/BlogViewModel'
import { blogsQueryRepository } from '../../repositories/blogs/blogs-query-repository';


export const findBlogController = async (req: RequestWithParams<URIParamsBlogIdModel>,
    res: Response<BlogViewModel>) => {
    const foundBlog = await blogsQueryRepository.findBlog(req.params.id)
    if (!foundBlog) {
        res.sendStatus(404)
        return
    }
    res.json(foundBlog)
}
