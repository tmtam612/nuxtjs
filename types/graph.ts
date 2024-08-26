export interface GraphInterface {
	id: number;
	UserID: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	createdBy: string;
	updatedBy: string;
	deleted: boolean;
	nodeID: number;
	edgeID: number;
	dimensionID: number;
}
export interface node {
	id: string;
	type: string;
	position: any;
	data: any;
}