import express from 'express'
import { blogsRouter } from './routers/blogsRouter'
import { SETTINGS } from './settings'
import { postsRouter } from './routers/postsRouter'
import { testingRouter } from './routers/testingRouter'
//import cors from 'cors'


export const app = express()
app.use(express.json()) // добавление ко всем реквестам body и query (превращает json в нормальный js-объект)
//app.use(cors())  //разрешается доступ вскм фронтам

app.get('/', (req, res) => {
    // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
    res.status(200).json({ version: '1.0' })
})
app.use(SETTINGS.PATH.BLOGS, blogsRouter)
app.use(SETTINGS.PATH.POSTS, postsRouter)
app.use(SETTINGS.PATH.TESTING, testingRouter)