-- CreateTable
CREATE TABLE "edges" (
    "id" SERIAL NOT NULL,
    "Graph" JSONB NOT NULL,

    CONSTRAINT "edges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nodes" (
    "id" SERIAL NOT NULL,
    "Graph" JSONB NOT NULL,

    CONSTRAINT "nodes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "graphs" (
    "id" SERIAL NOT NULL,
    "UserID" VARCHAR(256) NOT NULL,
    "name" VARCHAR(256) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdBy" VARCHAR(256) NOT NULL,
    "updatedBy" VARCHAR(256) NOT NULL,
    "deleted" BOOLEAN NOT NULL,

    CONSTRAINT "graphs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dimensions" (
    "id" SERIAL NOT NULL,
    "Graph" JSONB NOT NULL,

    CONSTRAINT "dimensions_pkey" PRIMARY KEY ("id")
);
