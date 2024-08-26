import { graphs, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { response } from "../../types";
interface DetailGraph extends graphs {
	detailGraph: any;
	currentNodeId: number;
}
export default defineEventHandler(async (event) => {
	const result: response = { statusCode: 400, payload: null, message: "" };
	try {
		const id = parseInt(getRouterParam(event, "id")) as number;
		const graphs = await prisma.graphs.findUnique({
			where: {
				id: id,
			},
		});
		const details: DetailGraph = graphs
			? { ...graphs, detailGraph: null, currentNodeId: 0 }
			: null;
		if (graphs) {
			const nodes = graphs.nodeID
				? await prisma.nodes.findUnique({
						where: {
							id: graphs.nodeID,
						},
				  })
				: null;
			if (nodes && nodes.Graph && Array.isArray(nodes.Graph)) {
				const arrNodeId = nodes.Graph.map((element: any) =>
					parseInt(element.id),
				);
				details.currentNodeId = Math.max(...arrNodeId) as number;
			}
			const edges = graphs.edgeID
				? await prisma.edges.findUnique({
						where: {
							id: graphs.edgeID,
						},
				  })
				: null;
			const dimension = graphs.dimensionID
				? await prisma.dimensions.findUnique({
						where: {
							id: graphs.dimensionID,
						},
				  })
				: null;
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
