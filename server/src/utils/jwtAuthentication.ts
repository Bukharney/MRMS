import jwt from "jsonwebtoken";
import { Secret } from "jsonwebtoken";
import usersService from "../services/users";

function jwtAuthentication(user: any) {
  const key = process.env.TOKEN_SECRET;
  if (!key) {
    throw new Error("Token secret key is missing");
  }

  const secretKey: Secret = key;
  const token = jwt.sign(
    { userId: user._id, role: user.role, username: user.username },
    secretKey,
    {
      expiresIn: "1h",
    }
  );

  return token;
}

function jwtVerify(token: string) {
  const key = process.env.TOKEN_SECRET;
  if (!key) {
    throw new Error("Token secret key is missing");
  }

  const secretKey: Secret = key;
  const decoded = jwt.verify(token, secretKey) as {
    userId: string;
    exp: number;
  };
  const { userId, exp } = decoded;
  if (exp < Date.now() / 1000) {
    return new Error("Token expired");
  }
  return userId;
}

function getUserByToken(token: string) {
  try {
    const userId = jwtVerify(token);
    if (userId instanceof Error) {
      throw new Error("Invalid token");
    }
    const user = usersService.get(userId);
    return user;
  } catch (err) {
    return null;
  }
}

export default { jwtAuthentication, getUserByToken, jwtVerify };
