import { app } from '../src/app'
import { agent } from 'supertest'
// import request from "supertest"


//agent будет следить за нашим backend, и через него будем делать какие-то запросы
//вспомогательную/повторяющуюся логику можно складывать в отдельные файлы:

export const req = agent(app) //обозвали req (с помощью него будем делать запросы на backend)

// const getRequest = () => {
//     return request(app)
// }
