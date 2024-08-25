import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Node, response, Edge } from '../types';
interface requestBody {
    nodes: Array<any>;
    edges: Array<any>;
    graphs: any;
}
export default defineEventHandler(async (event) => {
    const result: response = { statusCode: 400, payload: null, message: '' };
    try {
        const body = await readBody(event);
        const { nodes, edges, ...graphs } = body;
        console.log(body);
        result.statusCode = 200;
    } catch (err) {
        console.log(err);
        result.message = err.toString();
        result.statusCode = 400;
    }
    return result;
});
