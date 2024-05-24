import { Collection, Db, MongoClient } from "mongodb";
import { BlogDBType, PostDBType } from "./db-type";
import { SETTINGS } from "../settings";

export let client: MongoClient = {} as MongoClient //теперь это наша база данных

//переменные вынесены наружу, чтобы были доступны в других файлах
export let db: Db = {} as Db
export let blogCollection: Collection<BlogDBType> = {} as Collection<BlogDBType>
export let postCollection: Collection<PostDBType> = {} as Collection<PostDBType>

//ф-ция подключения к базе данных (подключаем внутри, чтобы делать разные ссылки в разный момент - удобно для тестов)
export const connectToDB = async (MONGO_URL: string) => {
    try {
        client = new MongoClient(MONGO_URL) //пользователь, к-рый подключается к базе данных
        db = client.db(SETTINGS.DB_NAME)  //к какой базе данных подключаемся

        blogCollection = db.collection<BlogDBType>(SETTINGS.BLOG_COLLECTION_NAME)  //создаем коллекцию
        postCollection = db.collection<PostDBType>(SETTINGS.POST_COLLECTION_NAME)

        await client.connect()  //инициализируем connect() чтобы если строка подключения не правильная упало здесь
        return true

    } catch (e) {
        console.log(e)
        await client.close()
        return false
    }
}