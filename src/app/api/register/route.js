import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();
  await prisma.user
    .create({
      data: {
        name: body.name,
        middleName: body.middleName,
        lastName: body.lastName,
        phone: body.phone,
        email: body.email,
        password: body.password,
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
  return new NextResponse("User created successfully");
}
