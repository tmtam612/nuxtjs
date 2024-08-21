import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Node, response, Edge } from '../types';

export default defineEventHandler(async (event) => {
    const result: response = { statusCode: 400, payload: null, message: '' };
    try {
        const body = await readBody(event);
        const nodes = body && body.nodes ? body.nodes.map((node: Node) => {
            return {
                type: node.type,
                label: node.label,
                data: node.data,
                position: node.position,
            }
        }) : [];
        const edges = body && body.edges ? body.edges.map((edge: Edge) => {
            return {
                source: edge.source,
                target: edge.target,
                sourceHandle: edge.sourceHandle,
                targetHandle: edge.targetHandle,
                animated: edge.animated,
            }
        }) : [];
        await prisma.nodes.createMany({
            data: nodes
        });
        await prisma.edges.createMany({
            data: edges
        });
        result.statusCode = 200;
    } catch (err) {
        console.log(err);
        result.message = err.toString();
        result.statusCode = 400;
    }
    return result;
});
