import { Request } from "express";

function getToken(req: Request) {
  let token = req.headers.authorization;
  if (!token) {
    throw new Error("Token not provided");
  }
  token = token.split(" ")[1];
  return token;
}

export default { getToken };
