export interface response {
	statusCode: number; // or whatever type you need
	payload: any; // or whatever type you need
	message: string; // or whatever type you need
}

export declare type Node = {
	type: string;
	label: string;
	data: JSON | null;
	position: JSON | null;
};

export declare type Edge = {
	source: number;
	target: number;
	sourceHandle: string | null;
	targetHandle: string | null;
	animated: boolean | null;
};
