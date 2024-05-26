import mongoose from "mongoose";

export enum Roles {
  ADMIN = "admin",
  MANAGER = "manager",
  TEAMLEADER = "teamleader",
  FLOORSTAFF = "floorstaff",
}

export interface User {
  id?: number;
  username: string;
  email: string;
  role: string;
  password: string;
}

const UsersSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: Object.values(Roles),
    required: true,
  },
  password: {
    type: String,
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

export default mongoose.model("Users", UsersSchema);
