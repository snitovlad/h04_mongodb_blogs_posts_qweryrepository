import { config } from 'dotenv' //забираем спецфункцию из библиотеки dotenv
config() // добавление переменных из файла .env в process.env

// const buff2 = Buffer.from(process.env.ADMIN_AUTH, 'utf8')
//     const codedAuth = buff2.toString('base64')

export const SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 3004,
    PATH: {
        BLOGS: '/blogs',
        POSTS: '/posts',
        TESTING: '/testing/all-data'
    },
    DB_NAME: process.env.DB_NAME || '',
    BLOG_COLLECTION_NAME: process.env.BLOG_COLLECTION_NAME || '',
    POST_COLLECTION_NAME: process.env.POST_COLLECTION_NAME || '',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://0.0.0.0:27017',
    ADMIN_AUTH: process.env.ADMIN_AUTH || '',
    ADMIN_AUTH_FOR_TESTS: process.env.ADMIN_AUTH_FOR_TESTS || ''
}

//export const ADMIN_AUTH = 'YWRtaW46cXdlcnR5'
//export const ADMIN_AUTH = process.env.ADMIN_AUTH || ''
