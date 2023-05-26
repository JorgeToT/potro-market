import { cookies } from "next/headers";
import { verify } from "jsonwebtoken";

export async function GET() {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  if (!token) {
    return new Response(JSON.stringify({ message: "Don't have token" }), {
      status: 401,
    });
  }

  try {
    const user = verify(token.value, "secret");
    return new Response(user.email, {
      status: 200,
    });
  } catch (err) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }
}
