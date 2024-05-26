import Users, { User } from "../models/users";
import bcrypt from "bcrypt";

async function getAll() {
  return Users.find();
}

async function get(id: string) {
  return Users.findOne({ _id: id });
}

async function getOneByUsername(username: string) {
  return Users.findOne({
    username: username,
  });
}

async function create(data: User) {
  const user = await getOneByUsername(data.username);
  if (user) {
    throw new Error("User already exists");
  }
  const hashedPassword = await bcrypt.hash(data.password, 10);
  data.password = hashedPassword;
  return new Users(data).save();
}

async function update(id: string, data: User) {
  return Users.findOneAndUpdate({ _id: id }, data);
}

async function remove(id: string) {
  return Users.findByIdAndDelete(id);
}

export default { getAll, get, create, update, remove };
