import postgres from 'postgres'
const url = 'postgres://your_user:your_password@localhost:5432/your_database'
export const sql = postgres(url, { rejectUnauthorized: false })