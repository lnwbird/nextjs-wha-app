import "dotenv/config"
import { PrismaMariaDb } from "@prisma/adapter-mariadb"
import { PrismaClient } from "../../generated/prisma/client.js"

const adapter = new PrismaMariaDb(process.env.DATABASE_URL!)
const prisma = new PrismaClient({ adapter })

const user = await prisma.user.update({
  where: { email: "ab@gmail.com" },
  data: { role: "admin" },
})

console.log("Updated:", user.id, user.email, "->", user.role)
await prisma.$disconnect()
