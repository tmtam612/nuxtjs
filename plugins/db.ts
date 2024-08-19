import { Client } from 'pg';

const client = new Client({
    user: 'admin',
    host: 'localhost',
    database: 'test',
    password: '123',
    port: 5432, // Default PostgreSQL port
});

client.connect();

export default client;
