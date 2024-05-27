import { Request, Response, NextFunction } from "express";
import moviesService from "../services/movies";
import authService from "../services/auth";
import utils from "../utils/utils";
import { Roles } from "../models/users";

async function getAll(_req: Request, res: Response, next: NextFunction) {
  try {
    const result = await moviesService.getAll();
    if (!result) {
      res.status(404).json({
        mesages: `Movies not found`,
      });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function get(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await moviesService.get(req.params.id);
    if (!result) {
      res.status(404).json({
        mesages: `MovieId: ${req.params.id} not found`,
      });
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await moviesService.create(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const { title, year, rating } = req.body;
    console.log(title, year, rating);
    const result = await moviesService.update(req.params.id, {
      title,
      year,
      rating,
    });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const user = await authService.getUserByToken(utils.getToken(req));
    if (user?.role != Roles.MANAGER) {
      throw new Error("You do not have permission to delete");
    }
    await moviesService.remove(req.params.id);
    res.status(200).json({
      mesages: `MovieId: ${req.params.id} has been delete`,
    });
  } catch (err) {
    next(err);
  }
}

export default {
  getAll,
  get,
  create,
  update,
  remove,
};
