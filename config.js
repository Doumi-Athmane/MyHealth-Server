import pg from "pg";


const client = new pg.Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "09062014bemA",
    database: "MyHealth"
})

export default client
