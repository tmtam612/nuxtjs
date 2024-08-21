-- CreateTable
CREATE TABLE "edges" (
    "id" SERIAL NOT NULL,
    "source" VARCHAR(256) NOT NULL,
    "target" VARCHAR(256) NOT NULL,
    "sourceHandle" VARCHAR(256),
    "targetHandle" VARCHAR(256),
    "animated" BOOLEAN,

    CONSTRAINT "edges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nodes" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(256) NOT NULL,
    "label" VARCHAR(256) NOT NULL,
    "position" JSONB,
    "data" JSONB,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "roadmap" (
    "id" INTEGER NOT NULL,
    "Graph" JSONB NOT NULL,
    "UserID" CHAR NOT NULL,
    "deleted" BOOLEAN NOT NULL,

    CONSTRAINT "roadmap_pkey" PRIMARY KEY ("id")
);
