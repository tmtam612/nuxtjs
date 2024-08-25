import { graphs, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { response } from '../types';
interface DetailGraph extends graphs {
    detailGraph: any;
}
export default defineEventHandler(async (event) => {
    const result: response = { statusCode: 400, payload: null, message: '' };
    try {
        const id = getRouterParam(event, 'id');
        const graphs = await prisma.graphs.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        const details: DetailGraph = graphs
            ? { ...graphs, detailGraph: null }
            : null;
        if (graphs) {
            const nodes = await prisma.nodes.findUnique({
                where: {
                    id: graphs.nodeID,
                },
            });
            const edges = await prisma.edges.findUnique({
                where: {
                    id: graphs.edgeID,
                },
            });
            const dimension = await prisma.dimensions.findUnique({
                where: {
                    id: graphs.dimensionID,
                },
            });
            if (dimension && dimension.Graph) {
                details.detailGraph = dimension.Graph;
                details.detailGraph = {
                    ...details.detailGraph,
                    ...(nodes && nodes.Graph ? { nodes: nodes.Graph } : {}),
                    ...(edges && edges.Graph ? { edges: edges.Graph } : {}),
                };
            }
        }
        result.statusCode = 200;
        result.payload = details;
    } catch (err) {
        console.log(err);
        result.statusCode = 400;
        result.message = err.toString();
    }

    return result;
});
