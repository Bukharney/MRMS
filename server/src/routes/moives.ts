import express from "express";
import moviesController from "../controllers/movies";

const router = express.Router();

router.get("/", moviesController.getAll);

router.get("/:id", moviesController.get);

router.post("/", moviesController.create);

router.put("/:id", moviesController.update);

router.delete("/:id", moviesController.remove);

export default router;
