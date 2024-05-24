import { ObjectId } from "mongodb"
import { PostDBType } from "../../db/db-type"
import { blogCollection, postCollection } from "../../db/mongo-db"
import { currentDateISOString } from "../../helper/helper"
import { CreatePostModel } from "../../models/posts-models/CreatePostModel"
import { PostViewModel } from "../../models/posts-models/PostViewModel"
import { UpdatePostModel } from "../../models/posts-models/UpdatePostModel"
import { postsQueryRepository } from "./posts-query-repository"

export const postsMongoRepository = {

    // async findAllPosts(): Promise<PostViewModel[]> {
    //     const posts = await postCollection.find({}).toArray() //здесь можно без await
    //     return posts.map(this.mapToOutput)
    // },

    // async findPost(id: string): Promise<PostViewModel | null> {
    //     const post = await postCollection.findOne({ _id: new ObjectId(id) })
    //     if (!post) return null
    //     return this.mapToOutput(post)
    // },

    async createPost(input: CreatePostModel): Promise<{ error?: string, id?: ObjectId }> {

        const blogName = await blogCollection.findOne({ _id: new ObjectId(input.blogId) })
        const newPost = {
            _id: new ObjectId(),
            ...input,
            blogName: blogName?.name,
            createdAt: currentDateISOString(),
        }
        try {
            const insertedInfo = await postCollection.insertOne(newPost)
            console.log(insertedInfo)
            return { id: insertedInfo.insertedId } //возвращаем объект
        } catch (e: any) {
            // log
            return { error: e.message }
        }
    },

    async deletePost(id: string): Promise<boolean> {

        const deleteInfo = await postCollection.deleteOne({ _id: new ObjectId(id) })
        return deleteInfo.deletedCount === 1 //eсли 1 - значит true
    },

    async updatePost(id: string, input: UpdatePostModel): Promise<boolean | { error?: string }> {

        let foundPost = await postsQueryRepository.findPost(id)
        const updatePost = { ...foundPost, ...input }
        try {
            const updateInfo = await postCollection.updateOne({ _id: new ObjectId(id) }, { $set: updatePost })
            return updateInfo.matchedCount === 1
        } catch (e: any) {
            // log
            return { error: e.message }
        }
    },

    // mapToOutput(post: PostDBType): PostViewModel {
    //     return {
    //         id: post._id,
    //         title: post.title,
    //         shortDescription: post.shortDescription,
    //         content: post.content,
    //         blogId: post.blogId.toString(),
    //         blogName: post.blogName,
    //         createdAt: post.createdAt
    //     }
    // }
}
