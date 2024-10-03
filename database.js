import { randomUUID } from 'node:crypto'
import { sql } from './db.js'

sql`CREATE TABLE IF NOT EXISTS videos (videoid varchar(255), title varchar(255), description varchar(255), duration int)`.then(
    () => {
        console.log('Tabela criada com sucesso!')
    },
    (error) => {
        console.log('Erro ao criar tabela:', error)
    }
)

export class Database {
    async list(search) {
        let videos
        if (search) {
            videos = await sql`SELECT * FROM videos WHERE title ILIKE ${'%' + search + '%'}`;
        } else {
            videos = await sql`SELECT * FROM videos`;
        }
        return videos
    }

    async create(video) {
        const videoid = randomUUID()
        await sql`INSERT INTO videos (videoid, title, description, duration) VALUES (${videoid}, ${video.title}, ${video.description}, ${video.duration})`
        return videoid
    }
    async delete(videoid) {
        await sql`DELETE FROM videos WHERE videoid = ${videoid}`
    }
    async update(videoid, video) {
        await sql`UPDATE videos SET title = ${video.title}, description = ${video.description}, duration = ${video.duration} WHERE videoid = ${videoid}`
    }
}