import fetch from "node-fetch";

const isAuthenticated = async (token) => {
  const resp = await fetch(
    `${process.env.AUTH_URL}?token=${token}`
  ).then((x) => x.json());
  if (resp.error) {
    return false;
  }
  return resp;
};

export const authMiddleware = async (ctx, next) => {
  const token = ctx.request.query.token;
  if (!token) {
    ctx.body = { error: "authentication required", code: "100" };
    return;
  }
  const authResp = await isAuthenticated(token);
  if (!authResp) {
    ctx.body = { error: "authentication required", code: "200" };
    return;
  }
  ctx.body = authResp;
  next();
};
