import { BlogsQueryModel } from '../../models/blogs-models/BlogsQueryModel';
import { Request, Response } from "express"
import { blogsQueryRepository } from "../../repositories/blogs/blogs-query-repository"
import { SortDirection } from "mongodb"
import { RequestWithQuery } from "../../models/requestTypes"
import { BlogsViewModel } from "../../models/blogs-models/BlogsViewModel"
import { ErrorsViewModel } from '../../models/errors-models/ErrorsViewModel';



const queryDefaulValues = (query: BlogsQueryModel/*{[key: string]: number | undefined}*/) => {
    // варианты задания дефолтных значений
    return {
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : null,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
    }
}

export const findAllBlogsController = async (
    req: RequestWithQuery<BlogsQueryModel>, res: Response<BlogsViewModel | { error: string }>) => {
    const sanitizedQuery = queryDefaulValues(req.query)
    const allBlogs = await blogsQueryRepository.findAllBlogs(sanitizedQuery)
    res
        .status(200)
        .json(allBlogs)
}
// as {[key: string]: number | undefined}