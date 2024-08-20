import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { response } from '../types';

export default defineEventHandler(async (event) => {
    const result: response = { statusCode: 400, payload: null, message: '' };
    try {
        const nodes = await prisma.nodes.findMany();
        const edges = await prisma.edges.findMany();
        result.statusCode = 200;
        result.payload = {
            nodes: nodes,
            edges: edges,
        };
    } catch (err) {
        console.log(err);
        result.statusCode = 400;
        result.message = err.toString();
    }

    return result;
});
