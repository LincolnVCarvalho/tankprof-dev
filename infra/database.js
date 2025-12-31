import { Client } from "pg";

async function query(queryObject) {
    const client = new Client({
        host: process.env.POSTGRES_HOST,
        port: process.env.POSTGRES_PORT,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        ssl: getSSLValues(),
    });

    await client.connect();

    try {
        const response = await client.query(queryObject);
        await client.end();
        return response;
    } catch (error) {
        console.error("Database query error:", error);
        throw error;
    } finally {
        await client.end();
    }
}

function getSSLValues() {
    return process.NODE_ENV === "production" ? true : false;
}

export default {
    query: query,
};
