import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Node, response, Edge } from '../types';
import moment from 'moment';
interface requestBody {
    nodes: Array<any>;
    edges: Array<any>;
    graphs: any;
}
export default defineEventHandler(async (event) => {
    const result: response = { statusCode: 400, payload: null, message: '' };
    try {
        const body = await readBody(event);
        const now = moment().format().toString();
        const graph = {
            UserID: '1',
            name: body.name,
            createdAt: now,
            updatedAt: now,
            createdBy: '1',
            updatedBy: '1',
            deleted: false,
            nodeID: null as number | null,
            edgeID: null as number | null,
            dimensionID: null as number | null,
        };
        const res = await prisma.graphs.create({
            data: graph,
        });
        result.statusCode = 200;
        result.payload = res;
    } catch (err) {
        console.log(err);
        result.message = err.toString();
        result.statusCode = 400;
    }
    return result;
});
