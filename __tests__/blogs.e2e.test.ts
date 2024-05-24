import { req } from './test-helpers';
import { SETTINGS } from '../src/settings'
import { CreateBlogModel } from '../src/models/blogs-models/CreateBlogModel'
import { UpdateBlogModel } from '../src/models/blogs-models/UpdateBlogModel'
import { clearTestDb, closeTestDb, connectToTestDb, createNewBlog, createNewEntity } from './mongo-datasets';
import { ObjectId } from 'mongodb';


describe('/blogs', () => {

    beforeAll(async () => {
        await connectToTestDb()
        // await req.delete('/testing/all-data')

    })
    beforeEach(async () => {
        await clearTestDb()
    })
    afterAll(async () => {
        await closeTestDb()
    })

    it('should return 200 and empty array', async () => {
        const res = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200)
        console.log(res.body.items)
        expect(res.body.items.length).toBe(0)
    })

    it('should get not empty array', async () => {

        //создаем новый блог
        const newBlog = createNewBlog
        const res = await createNewEntity(newBlog, SETTINGS.PATH.BLOGS)

        const res1 = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200)
        //console.log(res1.body)
        expect(res1.body.items.length).toBe(1)
        expect(res1.body.items[0]).toEqual(res.body)
    })

    it('should return 404 for not exiting blog', async () => {
        const nonExitingId = (new ObjectId()).toString()
        const res = await req
            .get(SETTINGS.PATH.BLOGS + '/' + nonExitingId) //нет такого id
            .expect(404) // проверка на ошибку
    })

    //создание нового блога
    it('should create blog', async () => {
        const newBlog = createNewBlog
        const res = await createNewEntity(newBlog, SETTINGS.PATH.BLOGS)

        expect(res.body.name).toBe(newBlog.name)
        expect(res.body.description).toBe(newBlog.description)
        expect(res.body.websiteUrl).toEqual(newBlog.websiteUrl)
    })

    it('shouldn\'t create blog with incorrect input data', async () => {

        const newBlog: CreateBlogModel = {
            name: 'name1',
            description: 'description1',
            websiteUrl: 'https://it-com' //incorrect input data
        }
        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set({ 'authorization': 'Basic ' + SETTINGS.ADMIN_AUTH_FOR_TESTS })
            .send(newBlog) // отправка данных
            .expect(400)

        const res1 = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200)
        expect(res1.body.items).toEqual([])
    })

    it('shouldn\'t create blog with incorrect input name', async () => {

        const newBlog: CreateBlogModel = {
            name: '   ', //incorrect input data
            description: 'description1',
            websiteUrl: 'https://it.com'
        }
        const res = await req
            .post(SETTINGS.PATH.BLOGS)
            .set({ 'authorization': 'Basic ' + SETTINGS.ADMIN_AUTH_FOR_TESTS })
            .send(newBlog) // отправка данных
            .expect(400)
        const res1 = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200)
        expect(res1.body.items).toEqual([])
    })

    //не должен обновить с некорректными входными данными 
    it(`shouldn't update blog with incorrect input data`, async () => {
        //создаем новый блог
        const newBlog = createNewBlog
        const res = await createNewEntity(newBlog, SETTINGS.PATH.BLOGS)

        //обновляем
        const updateBlog: UpdateBlogModel = {
            name: 'updateName',
            description: 'updateDdescription',
            websiteUrl: 'https://it-com' //incorrect input data            
        }
        await req
            .put(SETTINGS.PATH.BLOGS + '/' + res.body.id)
            .set({ 'authorization': 'Basic ' + SETTINGS.ADMIN_AUTH_FOR_TESTS })
            .send(updateBlog)
            .expect(400)

        //проверим, что действительно не обновился блог
        const res2 = await req
            .get(SETTINGS.PATH.BLOGS + '/' + res.body.id)
            .expect(200, res.body)
        expect(res2.body).toEqual(res.body)
    })

    //не должен обновить с некорректным входным name 
    it(`shouldn't update blog with incorrect input data`, async () => {
        //создаем новый блог
        const newBlog = createNewBlog
        const res = await createNewEntity(newBlog, SETTINGS.PATH.BLOGS)

        //обновляем
        const updateBlog: UpdateBlogModel = {
            name: '   ', //incorrect input data
            description: 'description1',
            websiteUrl: 'https://it.com'
        }
        await req
            .put(SETTINGS.PATH.BLOGS + '/' + res.body.id)
            .set({ 'authorization': 'Basic ' + SETTINGS.ADMIN_AUTH_FOR_TESTS })
            .send(updateBlog)
            .expect(400)

        //проверим, что действительно не обновился блог
        const res2 = await req
            .get(SETTINGS.PATH.BLOGS + '/' + res.body.id)
            .expect(200, res.body)
        expect(res2.body).toEqual(res.body)
    })

    //не должен обновиться блог, которого нет
    it(`shouldn't update blog that not exist`, async () => {
        const nonExitingId = (new ObjectId()).toString()
        const updateBlog: UpdateBlogModel = {
            name: 'name1',
            description: 'description1',
            websiteUrl: 'https://it.com'
        }

        await req
            .put(SETTINGS.PATH.BLOGS + '/' + nonExitingId)
            .set({ 'authorization': 'Basic ' + SETTINGS.ADMIN_AUTH_FOR_TESTS })
            .send(updateBlog)
            .expect(404)

        //проверим, что действительно не обновился блог
        const res2 = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200)
        expect(res2.body.items).toEqual([])
    })

    //должен обновиться блог с корректными входными данными
    it(`should update video with correct input data`, async () => {
        //создаем новый блог
        const newBlog = createNewBlog
        const res = await createNewEntity(newBlog, SETTINGS.PATH.BLOGS)

        //обновляем
        const updateBlog: UpdateBlogModel = {
            name: 'newName',
            description: 'newDescription',
            websiteUrl: 'https://it.by'
        }

        const res1 = await req
            .put(SETTINGS.PATH.BLOGS + '/' + res.body.id)
            .set({ 'authorization': 'Basic ' + SETTINGS.ADMIN_AUTH_FOR_TESTS })
            .send(updateBlog)
            .expect(204)
        //проверим, что действительно обновился блог
        const res2 = await req
            .get(SETTINGS.PATH.BLOGS + '/' + res.body.id)
            .expect(200, {
                ...res.body,
                name: updateBlog.name,
                description: updateBlog.description,
                websiteUrl: updateBlog.websiteUrl
            })
    })

    //удаление блога и возвращение пустого массива
    it(`should delete blog and return empty array`, async () => {
        //создаем новый блог
        const newBlog = createNewBlog
        const res = await createNewEntity(newBlog, SETTINGS.PATH.BLOGS)

        //проверили, что блог есть в базе данных
        const res1 = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200)
        expect(res1.body.items).toEqual([res.body])

        //удалим его
        await req
            .delete(SETTINGS.PATH.BLOGS + '/' + res.body.id)
            .set({ 'authorization': 'Basic ' + SETTINGS.ADMIN_AUTH_FOR_TESTS })
            .expect(204)
        //проверим, что действительно удалился
        const res2 = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200)
        expect(res2.body.items).toEqual([])
    })

    //не должен удалить несуществующий блог
    it(`shouldn't delete blog that not exist`, async () => {
        const nonExitingId = (new ObjectId()).toString()
        //создаем новый блог
        const newBlog = createNewBlog
        const res = await createNewEntity(newBlog, SETTINGS.PATH.BLOGS)

        //проверили, что блог есть в базе данных
        const res1 = await req
            .get(SETTINGS.PATH.BLOGS)
            .expect(200)
        expect(res1.body.items).toEqual([res.body])

        await req
            .delete(SETTINGS.PATH.BLOGS + '/' + nonExitingId)
            .set({ 'authorization': 'Basic ' + SETTINGS.ADMIN_AUTH_FOR_TESTS })
            .expect(404)
        //проверим, что ничего не удалилось
        await req
            .get(SETTINGS.PATH.BLOGS + '/' + res.body.id)
            .expect(200, res.body)
    })
})


