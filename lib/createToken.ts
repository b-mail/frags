import jwt from "jsonwebtoken";

export function createAccessToken(payload: { uid: number; iat: number }) {
  return jwt.sign(payload, process.env.JWT_ACCESS_SECRET as string, {
    expiresIn: "1h",
  });
}

export function createRefreshToken(payload: { key: number; iat: number }) {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET as string, {
    expiresIn: "7d",
  });
}
