import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const prisma = new PrismaClient();

export async function POST(request) {
  const body = await request.json();
  let serializedToken = "";
  let status = 200;
  await prisma.user
    .findUnique({
      where: {
        email: body.email,
      },
    })
    .then(async (data) => {
      await prisma.$disconnect();
      if (data) {
        if (data.password === body.password) {
          const token = jwt.sign(
            {
              exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
              email: data.email,
              id: data.id,
            },
            "secret"
          );
          serializedToken = serialize("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7,
            path: "/",
          });
        } else {
          status = 202;
        }
      } else {
        status = 202;
      }
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
  return new Response("Usuario logueado", {
    status: status,
    headers: {
      "Set-Cookie": `${serializedToken}`,
    },
  });
}
