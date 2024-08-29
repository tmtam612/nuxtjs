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
    data: nodeData;
}
export interface edge {
    id: string;
    source: string;
    sourceHandle: string;
    target: string;
    targetHandle: string;
    type: string;
}

export interface nodeData {
    title: string;
    order_no: number;
    content: string;
    lessons: Array<any>;
    link: string;
    isParent: boolean;
    parentId: number;
    done: boolean;
}
