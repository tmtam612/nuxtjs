import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { response } from '../types';

export default defineEventHandler((event) => {
    const result: response = { statusCode: 400, payload: null, message: '' };
    try {
        result.statusCode = 200;
    } catch (err) {
        console.log(err);
        result.message = err.toString();
        result.statusCode = 400;
    }
});
