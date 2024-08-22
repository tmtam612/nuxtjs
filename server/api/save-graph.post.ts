import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { Node, response, Edge } from "../types";

export default defineEventHandler(async (event) => {
	const result: response = { statusCode: 400, payload: null, message: "" };
	try {
		const body = await readBody(event);
		await prisma.roadmap.create({
			data: {
				Graph: body,
				UserID: "tmtam612@gmail.com",
				deleted: false,
			},
		});
		result.statusCode = 200;
	} catch (err) {
		console.log(err);
		result.message = err.toString();
		result.statusCode = 400;
	}
	return result;
});
