import { Request, Response, NextFunction } from "express";
import usersService from "../services/users";
import authService from "../services/auth";

import User, { Roles } from "../models/users";
import utils from "../utils/utils";

async function register(req: Request, res: Response, next: NextFunction) {
  try {
    const role = await authService.getUserByToken(utils.getToken(req));
    if (role?.role != Roles.ADMIN) {
      throw new Error("You do not have permission to register");
    }
    const user = new User(req.body);
    const status = await usersService.create(user);
    res.status(200).json(status);
  } catch (err) {
    console.error(`Error: `, err as Error);
    next(err);
  }
}

export default { register };
