import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request) {
  const jwt = request.cookies.get("token")?.value;
  const secret = new TextEncoder().encode("secret");

  if (jwt === undefined) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(jwt, secret);
    const response = NextResponse.next();
    response.cookies.set("id", payload.id, {
      path: "/",
    });

    return response;
  } catch (e) {
    console.error(e);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/home", "/posts/:path*", "/profile/:path*"],
};
