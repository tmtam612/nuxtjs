import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { response } from "../types";

export default defineEventHandler(async (event) => {
	const result: response = { statusCode: 400, payload: null, message: "" };
	try {
		const nodesResponse = await prisma.nodes.findMany();
		const edgesResponse = await prisma.edges.findMany();
		const edges = edgesResponse.map((res) => {
			return {
				id: res.id,
				source: res.source,
				target: res.target,
				...(res.sourceHandle
					? { sourceHandle: res.sourceHandle }
					: {}),
				...(res.targetHandle
					? { targetHandle: res.targetHandle }
					: {}),
				...(res.animated ? { animated: res.animated } : {}),
			};
		});
		result.statusCode = 200;
		result.payload = {
			nodes: nodesResponse,
			edges: edges,
		};
	} catch (err) {
		console.log(err);
		result.statusCode = 400;
		result.message = err.toString();
	}

	return result;
});
