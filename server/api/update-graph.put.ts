import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { Node, response, Edge } from '../types';
import moment from 'moment';
export default defineEventHandler(async (event) => {
    const result: response = { statusCode: 400, payload: null, message: '' };
    try {
        const body = await readBody(event);
        const now = moment().format().toString();
        const graphResponse = await prisma.graphs.findUnique({
            where: {
                id: body.id,
            },
        });
        const updatedGraph = {
            ...graphResponse,
            ...{ updatedAt: now, updatedBy: '1' },
        };
        if (updatedGraph && updatedGraph.nodeID) {
            await prisma.nodes.update({
                data: body.nodes,
                where: {
                    id: updatedGraph.nodeID,
                },
            });
        } else {
            const nodes = await prisma.nodes.create({
                data: body.nodes,
            });
            updatedGraph.nodeID = nodes.id;
        }
        if (updatedGraph && updatedGraph.edgeID) {
            await prisma.edges.update({
                data: body.edges,
                where: {
                    id: updatedGraph.edgeID,
                },
            });
        } else {
            const edges = await prisma.edges.create({
                data: body.edges,
            });
            updatedGraph.edgeID = edges.id;
        }
        if (updatedGraph && updatedGraph.dimensionID) {
            await prisma.dimensions.update({
                data: body.dimensions,
                where: {
                    id: updatedGraph.dimensionID,
                },
            });
        } else {
            const dimensions = await prisma.dimensions.create({
                data: body.dimensions,
            });
            updatedGraph.dimensionID = dimensions.id;
        }
        const res = await prisma.graphs.update({
            data: updatedGraph,
            where: {
                id: body.id,
            },
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
