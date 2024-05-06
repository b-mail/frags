import jwt, { TokenExpiredError } from "jsonwebtoken";

export function validateAccessToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET as string);

    return {
      isValid: true,
      uid: (decoded as any).uid,
    };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return {
        isValid: false,
        error: "expired",
      };
    } else {
      return {
        isValid: false,
        error: "invalid",
      };
    }
  }
}

export function validateRefreshToken(token: string) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET as string);

    return {
      isValid: true,
      uid: (decoded as any).uid,
    };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return {
        isValid: false,
        error: "expired",
      };
    } else {
      return {
        isValid: false,
        error: "invalid",
      };
    }
  }
}
