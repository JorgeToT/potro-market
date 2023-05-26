import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";
import { serialize } from "cookie";

export async function POST(req) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");
  if (!token) {
    return new Response(`You dont have a token`, {
      status: 401,
    });
  }
  try {
    verify(token.value, "secret");
    const serializedToken = serialize("token", null, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 0,
      path: "/",
    });
    return new Response(`Logged out successfully`, {
      status: 200,
      headers: {
        "Set-Cookie": `${serializedToken}`,
      },
    });
  } catch (err) {
    return new Response(`You are not logged in`, {
      status: 401,
    });
  }
}
