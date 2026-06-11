import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client/index.js";
import { createRequire } from "module";
const require = createRequire(import.meta.url);
require("dotenv").config();

const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

try {
  const result = await prisma.$queryRawUnsafe("SHOW CREATE TABLE `user`");
  console.log(JSON.stringify(result, null, 2));
} catch (e) {
  console.error("Error:", e.message);
} finally {
  await prisma.$disconnect();
}
