import { app } from './app'
import { connectToDB } from './db/mongo-db'
import { SETTINGS } from './settings'

const startApp = async () => {

    if (!await connectToDB(SETTINGS.MONGO_URL)) {
        console.log('not connect to db')
        process.exit(1)  //если 0 - значит все ОК и программа выключилась, если остальное - стоп и ошибка
    }
    app.listen(SETTINGS.PORT, async () => {
        console.log(`...server started on port ${SETTINGS.PORT}`)
    })
}
startApp()

