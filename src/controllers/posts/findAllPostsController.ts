import { Request, Response } from 'express'
import { PostViewModel } from '../../models/posts-models/PostViewModel'
import { postsMongoRepository } from '../../repositories/posts/posts-mongo-repository'
import { postsQueryRepository } from '../../repositories/posts/posts-query-repository'
import { PostsViewModel } from '../../models/posts-models/PostsViewModel'
import { PostsQueryModel } from '../../models/posts-models/PostsQueryModel'
import { SortDirection } from 'mongodb'
import { RequestWithQuery } from '../../models/requestTypes'

//контроллер для эндпоинта:

const queryDefaulValues = (query: PostsQueryModel/*{[key: string]: number | undefined}*/) => {
    // варианты задания дефолтных значений
    return {
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
    }
}

export const findAllPostsController = async (
    req: RequestWithQuery<PostsQueryModel>, res: Response<PostsViewModel | { error: string }>) => {
    const sanitizedQuery = queryDefaulValues(req.query)
    const allPosts = await postsQueryRepository.findAllPosts(sanitizedQuery)
    res
        .status(200)
        .json(allPosts)
}