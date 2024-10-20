import { NextFunction, Request, Response } from "express";
import { NotAuthorisedError } from "../errors";
import verifyJwt from "../utils/verifyJwt";

export default function authorizer(resource?: string, action?: string) {
  return async function (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const bearerToken = req.headers["authorization"];
      if (!bearerToken) {
        throw new NotAuthorisedError("Missing header");
      }
      if (!bearerToken.startsWith("Bearer ")) {
        throw new NotAuthorisedError("Missing token");
      }
      const token = bearerToken.split(" ")[1];
      if (!token) {
        throw new NotAuthorisedError("Authorization token not found");
      }

      const decodedData = verifyJwt(token);

      const { userId, role } = decodedData;

      next();
    } catch (error) {
      next(error);
    }
  };
}
