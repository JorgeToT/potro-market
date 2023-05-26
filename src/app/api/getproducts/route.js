import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  let status = 200;
  let response;

  try {
    const data = await prisma.post.findMany({
      where: {
        published: true,
      },
    });
    await prisma.$disconnect();
    response = new Response(JSON.stringify(data));
  } catch (e) {
    console.error(e);
    await prisma.$disconnect();
    status = 500;
    response = new Response({ status: status });
    process.exit(1);
  }

  return response;
}
