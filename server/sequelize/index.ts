import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import { RoadMap } from './models/roadmap.model';

export const sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: 'test',
    user: 'admin',
    password: '123',
    host: 'localhost',
    port: 5432,
    ssl: true,
    clientMinMessages: 'notice',
    models: [RoadMap],
});
