import mongoose from "mongoose";

export enum Rating {
  G = "G",
  PG = "PG",
  M = "M",
  MA = "MA",
  R = "R",
}

export interface Movie {
  id?: number;
  title: string;
  year: number;
  rating: string;
}

const MoivesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  rating: {
    type: String,
    enum: Object.values(Rating),
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Movies", MoivesSchema);
