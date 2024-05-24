import { BlogsQueryModel } from '../../models/blogs-models/BlogsQueryModel';
import { Request, Response } from "express"
import { blogsQueryRepository } from "../../repositories/blogs/blogs-query-repository"
import { SortDirection } from "mongodb"
import { RequestWithParamsAndQuery, RequestWithQuery } from "../../models/requestTypes"
import { BlogsViewModel } from "../../models/blogs-models/BlogsViewModel"
import { PostsQueryModel } from '../../models/posts-models/PostsQueryModel';
import { URIParamsBlogIdModel } from '../../models/blogs-models/URIParamsBlogIdModel';
import { PostsViewModel } from '../../models/posts-models/PostsViewModel';
import { postsQueryRepository } from '../../repositories/posts/posts-query-repository';



const queryDefaulValues = (query: PostsQueryModel/*{[key: string]: number | undefined}*/) => {
    // варианты задания дефолтных значений
    return {
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
    }
}

export const findAllPostsOfBlogController = async (
    req: RequestWithParamsAndQuery<URIParamsBlogIdModel, PostsQueryModel>, res: Response<PostsViewModel | { error: string }>) => {

    const foundBlog = await blogsQueryRepository.findBlog(req.params.id)
    if (!foundBlog) {
        res.sendStatus(404)
        return
    }
    const sanitizedQuery = queryDefaulValues(req.query)
    const blogId = req.params.id
    const allPosts = await postsQueryRepository.findAllPosts(sanitizedQuery, blogId)
    res
        .status(200)
        .json(allPosts)
}