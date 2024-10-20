import type { RequestHandler } from "@builder.io/qwik-city";
import { jwtVerify } from "jose";
import { JWTExpired } from "jose/errors";

export const onRequest: RequestHandler = async ({
  next,
  cookie,
  redirect,
  sharedMap,
}) => {
  const token = cookie.get("auth-token");

  if (!token) throw redirect(301, "/log_in/");

  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  try {
    const { payload } = await jwtVerify(token.value, secret);

    sharedMap.set("auth", payload);
  } catch (error) {
    if (error instanceof JWTExpired) throw redirect(301, "/log_in/");
  } finally {
    await next();
  }
};
