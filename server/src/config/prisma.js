const path = require("path");

// Prisma 7 emits the client as TypeScript (ESM-shaped). tsx lets us load it from this CJS setup.
require("tsx/cjs/api").register();

const { PrismaClient } = require(
  path.join(__dirname, "../generated/prisma/client.ts"),
);
const { PrismaPg } = require("@prisma/adapter-pg");
const { pool } = require("./postgres");

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

module.exports = prisma;
