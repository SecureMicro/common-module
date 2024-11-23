import { NextFunction, Request, Response } from "express";
import { AccessForbiddenError, NotAuthorisedError } from "../errors";
import verifyJwt from "../utils/verifyJwt";
import { ums } from "../utils/apiService";
import { IGetRequestUser } from "../utils/interface";
import { isObjEmpty } from "../utils/helpers";

export default function authorizer(resource?: string, action?: string) {
  return async function (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      console.log('here----authorizer-------------------')
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

      const { userId } = decodedData;

      console.log("userId============", userId);

      const getRequestUserEndpoint: string = `user/${userId}`;

      const user = await ums.call<IGetRequestUser, undefined, undefined>(
        "get",
        getRequestUserEndpoint
      );

      if (!user || isObjEmpty(user)) {
        throw new AccessForbiddenError(
          "Your account has beeen disabled, please contact the administrator"
        );
      }

      // @ts-ignore
      req.user = user;

      next();
    } catch (error) {
      next(error);
    }
  };
}
