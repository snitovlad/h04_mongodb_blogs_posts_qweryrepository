import { ObjectId } from "mongodb";
import { blogCollection } from "../../db/mongo-db";
import { currentDateISOString } from "../../helper/helper";
import { BlogViewModel } from "../../models/blogs-models/BlogViewModel";
import { CreateBlogModel } from "../../models/blogs-models/CreateBlogModel";
import { UpdateBlogModel } from "../../models/blogs-models/UpdateBlogModel";
import { BlogDBType } from "../../db/db-type";
import { blogsQueryRepository } from "./blogs-query-repository";

export const blogsMongoRepository = {

    async createdBlog(input: CreateBlogModel): Promise<{ error?: string, id?: ObjectId }> {
        const newBlog = {
            _id: new ObjectId(),
            ...input,
            createdAt: currentDateISOString(),
            isMembership: true

        }
        try {
            const insertedInfo = await blogCollection.insertOne(newBlog)
            console.log(insertedInfo)
            return { id: insertedInfo.insertedId } //возвращаем объект
        } catch (e: any) {
            // log
            return { error: e.message }
        }
    },

    async deleteBlog(id: string): Promise<boolean> {

        //const foundBlog = await this.findBlog(id)
        // if (foundBlog) {
        //     await blogCollection.deleteOne(foundBlog)
        //     return true
        // } else return false

        const deleteInfo = await blogCollection.deleteOne({ _id: new ObjectId(id) })
        return deleteInfo.deletedCount === 1 //eсли 1 - значит true
    },

    async updateBlog(id: string, input: UpdateBlogModel): Promise<boolean | { error?: string }> {

        let foundBlog = await blogsQueryRepository.findBlog(id)
        const updateBlog = { ...foundBlog, ...input }
        try {
            const updateInfo = await blogCollection.updateOne({ _id: new ObjectId(id) }, { $set: updateBlog })
            return updateInfo.matchedCount === 1
        } catch (e: any) {
            // log
            return { error: e.message }
        }
    },

}