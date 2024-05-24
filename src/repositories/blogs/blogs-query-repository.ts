import { ObjectId } from "mongodb"
import { blogCollection } from "../../db/mongo-db"
import { BlogViewModel } from "../../models/blogs-models/BlogViewModel"
import { BlogDBType } from "../../db/db-type"
import { BlogsQueryModel } from "../../models/blogs-models/BlogsQueryModel"
import { BlogsViewModel } from "../../models/blogs-models/BlogsViewModel"
import { BlogsSanitizedQueryModel } from "../../models/blogs-models/BlogsSanitizedQueryModel"

export const blogsQueryRepository = {

    async findBlog(id: string): Promise<BlogViewModel | null> {
        const blog = await blogCollection.findOne({ _id: new ObjectId(id) })
        if (!blog) return null
        return this.mapToOutput(blog)
    },

    async findAllBlogs(sanitizedQuery: BlogsSanitizedQueryModel): Promise<BlogsViewModel | { error: string }> {
        // формирование фильтра (может быть вынесено во вспомогательный метод)
        //const byId = blogId ? { blogId: new ObjectId(blogId) } : {}

        const search = sanitizedQuery.searchNameTerm
            ? { name: { $regex: sanitizedQuery.searchNameTerm, $options: 'i' } } //$options: 'i' - все равно какой регистр
            : {}

        const filter = {
            //...byId,
            //_id: { $in: [new ObjectId(someStringId), ...] },
            ...search,
        }

        try {
            // собственно запрос в бд (может быть вынесено во вспомогательный метод)
            const items = await blogCollection
                .find(filter)
                .sort(sanitizedQuery.sortBy, sanitizedQuery.sortDirection)
                .skip((sanitizedQuery.pageNumber - 1) * sanitizedQuery.pageSize)
                .limit(sanitizedQuery.pageSize)
                .toArray() as BlogDBType[]

            // подсчёт элементов (может быть вынесено во вспомогательный метод)
            const totalCount = await blogCollection.countDocuments(filter)

            // формирование ответа в нужном формате (может быть вынесено во вспомогательный метод)
            return {
                pagesCount: Math.ceil(totalCount / sanitizedQuery.pageSize),
                page: sanitizedQuery.pageNumber,
                pageSize: sanitizedQuery.pageSize,
                totalCount,
                items: items.map(this.mapToOutput)
            }
        } catch (e) {
            console.log(e)
            return { error: 'error with getting of blogs' }
        }
    },

    mapToOutput(blog: BlogDBType): BlogViewModel {
        return {
            id: blog._id,
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }
    },

}
