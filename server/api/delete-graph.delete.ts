import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { response } from '../types';

export default defineEventHandler(async (event) => {
    const result: response = { statusCode: 400, payload: null, message: '' };
    try {
        const graph = await prisma.graphs.findMany();
        // const nodes = await prisma.nodes.findUnique({
        //     where: {
        //         id: graph.nodeID,
        //     },
        // });
        result.statusCode = 200;
        // result.payload = graphs;
    } catch (err) {
        console.log(err);
        result.statusCode = 400;
        result.message = err.toString();
    }

    return result;
});
