import Users from "../models/users";
import jwt from "../utils/jwtAuthentication";
import bcrypt from "bcrypt";

async function login(username: string, password: string) {
  const user = await Users.findOne({ username });
  if (!user) {
    throw new Error("User not found");
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new Error("Invalid password");
  }
  const token = jwt.jwtAuthentication(user);

  return { token };
}

async function getUserByToken(token: string) {
  try {
    return jwt.getUserByToken(token);
  } catch (err) {
    throw new Error("Invalid token");
  }
}

export default { login, getUserByToken };
