import { BlogDBType } from './../src/db/db-type';
import { MongoClient, ObjectId } from "mongodb"
import { MongoMemoryServer } from 'mongodb-memory-server'
import { blogCollection, client, connectToDB, postCollection } from "../src/db/mongo-db"
import { CreateBlogModel } from "../src/models/blogs-models/CreateBlogModel"
import { SETTINGS } from "../src/settings"
import { req } from "./test-helpers"
import { CreatePostModel } from "../src/models/posts-models/CreatePostModel"


let testServer: MongoMemoryServer

export const connectToTestDb = async () => {
    try {
        testServer = await MongoMemoryServer.create() //запуск виртуального сервера с временной базой данных
        const uri = testServer.getUri() //получаем строку подключения
        await connectToDB(uri)
        console.log('Connected to local MongoDB for tests')
        return true
    } catch (e) {
        console.error('Failed to connect to local MongoDB', e)
        await client.close()
        return false
    }
}

export const clearTestDb = async () => {
    await blogCollection.deleteMany({})
    await postCollection.deleteMany({})
    console.log('Local MongoDB is empty')
}

export const closeTestDb = async () => {
    await client.close()
    await testServer.stop()
    console.log('Local MongoDB closed')
}


export const createNewBlog: CreateBlogModel = {
    name: 'name1',
    description: 'description1',
    websiteUrl: 'https://it.com'
}
export const createNewEntity = async (newBlog: CreateBlogModel | CreatePostModel, path: string) => {
    return await req
        .post(path)
        .set({ 'authorization': 'Basic ' + SETTINGS.ADMIN_AUTH_FOR_TESTS }) //авторизация
        .send(newBlog) // отправка данных           
        .expect(201)
}

export const createNewPost = (id: string): CreatePostModel => {
    const newPost = {
        title: 'newTitle',
        shortDescription: 'newShortDescription',
        content: 'newContent',
        blogId: id
    }
    return newPost
}