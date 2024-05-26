import { Request, Response, NextFunction } from "express";
import utils from "../utils/utils";
import jwtUtils from "../utils/jwtAuthentication";

export async function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = jwtUtils.jwtVerify(utils.getToken(req));
    if (userId) {
      next();
    }
  } catch (err) {
    res.status(401).json({ error: err });
  }
}
