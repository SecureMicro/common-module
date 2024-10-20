import jwt, {
  JsonWebTokenError,
  TokenExpiredError,
  JwtPayload,
} from "jsonwebtoken";
import { NotAuthorisedError } from "../errors";

export default function verifyJwt(jwtToken: string): JwtPayload {
  const SECRET: string = process.env.JWT_SECRET!;

  try {
    const decodedData = <JwtPayload>jwt.verify(jwtToken, SECRET);
    return decodedData;
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new NotAuthorisedError("Token expired!");
    } else if (error instanceof JsonWebTokenError) {
      throw new NotAuthorisedError("Invalid token value");
    }
    throw error;
  }
}
