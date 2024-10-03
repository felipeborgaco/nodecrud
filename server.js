import { fastify } from 'fastify'
import { Database } from './database.js'

const server = fastify()
const database = new Database()

server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body
    await database.create({ title, description, duration })
    return reply.status(201).send()
})

server.get('/videos', async (request) => {
    const search = request.query.search
    const videos = await database.list(search)
    return videos
})

server.put('/videos/:videoid', async (request, reply) => {
    const { videoid } = request.params
    const { title, description, duration } = request.body
    await database.update(videoid, { title, description, duration })
    return reply.status(204).send()
})

server.delete('/videos/:videoid', async (request, reply) => {
    const { videoid } = request.params
    await database.delete(videoid)
    return reply.status(204).send()
})

server.listen({ port: 3000 })