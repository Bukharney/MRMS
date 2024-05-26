import { Request, Response, NextFunction } from "express";
import authService from "../services/auth";

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { username, password } = req.body;
    const user = await authService.login(username, password);
    res.status(200).json({
      token: user.token,
    });
  } catch (err) {
    next(err);
  }
}

export default { login };
