import jwt, { TokenExpiredError } from "jsonwebtoken";

export function validateAccessToken(token: string) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string,
    ) as {
      uid: number;
      iat: number;
    };

    return {
      isValid: true,
      uid: decoded.uid,
    };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return {
        isValid: false,
        error: "토큰의 유효기간이 만료되었습니다.",
      };
    } else {
      return {
        isValid: false,
        error: "유효하지 않은 토큰입니다.",
      };
    }
  }
}

export function validateRefreshToken(token: string) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET as string,
    ) as {
      iat: number;
    };

    return {
      isValid: true,
    };
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return {
        isValid: false,
        error: "토큰의 유효기간이 만료되었습니다.",
      };
    } else {
      return {
        isValid: false,
        error: "유효하지 않은 토큰입니다.",
      };
    }
  }
}
