import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { response } from '../types';
import moment from 'moment';

export default defineEventHandler(async (event) => {
    const result: response = { statusCode: 400, payload: null, message: '' };
    try {
        const body = await readBody(event);
		const now = moment().format().toString();
        await prisma.graphs.update({
            data: {
                deleted: true,
                updatedAt: now,
                updatedBy: '1'
            },
            where: {
                id: body.id
            }
        });
        result.statusCode = 200;
    } catch (err) {
        result.statusCode = 400;
        result.message = err.toString();
    }

    return result;
});
