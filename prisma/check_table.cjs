const { PrismaClient } = require('../generated/prisma');

async function main() {
  const prisma = new PrismaClient();
  try {
    const [result] = await prisma.$queryRawUnsafe('SHOW CREATE TABLE user');
    console.log('Table: user');
    console.log('Create Table:', result['Create Table']);
  } finally {
    await prisma.$disconnect();
  }
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
