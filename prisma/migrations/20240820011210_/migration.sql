-- CreateTable
CREATE TABLE "edges" (
    "id" BIGINT NOT NULL,
    "source" BIGINT NOT NULL,
    "target" BIGINT NOT NULL,
    "sourceHandle" CHAR,
    "targetHandle" CHAR,
    "animated" BOOLEAN,

    CONSTRAINT "edges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nodes" (
    "id" BIGINT NOT NULL,
    "type" CHAR NOT NULL,
    "label" CHAR NOT NULL,
    "positionX" BIGINT NOT NULL,
    "positionY" BIGINT NOT NULL,
    "data" JSONB,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roadmap" (
    "id" BIGINT NOT NULL,
    "Graph" JSONB NOT NULL,
    "UserID" CHAR NOT NULL,
    "deleted" BOOLEAN NOT NULL,

    CONSTRAINT "roadmap_pkey" PRIMARY KEY ("id")
);
