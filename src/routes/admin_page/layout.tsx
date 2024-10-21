import type { RequestHandler } from "@builder.io/qwik-city";
import { jwtVerify } from "jose";

export const onRequest: RequestHandler = async ({
  next,
  cookie,
  redirect,
  sharedMap,
}) => {
  const token = cookie.get("admin-session");

  if (!token) throw redirect(301, "/log_in/");

  const secret = new TextEncoder().encode(process.env.AUTH_SECRET);
  try {
    const { payload } = await jwtVerify(token.value, secret);

    sharedMap.set("admin", payload);
    console.log(payload);

    await next();
  } catch (error) {
    console.error(error);

    throw redirect(301, "/log_in/");
  }
};
