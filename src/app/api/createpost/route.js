import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req) {
  const cookieStore = cookies();
  const token = cookieStore.get("id");
  const body = await req.json();
  await prisma.post
    .create({
      data: {
        title: body.title,
        price: Number(body.price),
        description: body.description,
        published: body.published,
        authorId: Number(token.value),
        categories: {
          create: [
            {
              name: body.categories[0],
            },
            {
              name: body.categories[1],
            },
            {
              name: body.categories[2],
            },
          ],
        },
      },
    })
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  return new Response(`Post created successfully`);
}
