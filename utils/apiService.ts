import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosHeaders,
  AxiosError,
} from "axios";
import { IErrorClassObj, THttpMethod } from "./interface";
import {
  errorClassObj,
  InternalServerError,
  PreConditionError,
} from "../errors";
import { logger } from "./logger";
const { UMS_BE_BASE_URL } = process.env;

export default class SecureMicroApi {
  private baseUrl: string;

  constructor(baseUrl: string) {
    if (!UMS_BE_BASE_URL) {
      throw new PreConditionError(
        "Service base urls not loaded in environment"
      );
    }
    this.baseUrl = baseUrl;
  }

  async call<T, P, D>(
    method: THttpMethod,
    url: string,
    params?: P,
    data?: D,
    headers?: AxiosHeaders
  ): Promise<T> {
    const config: AxiosRequestConfig = {
      method,
      url: this.baseUrl + url,
      params,
      headers,
      data,
    };

    try {
      const response: AxiosResponse = await axios(config);
      console.log('here------------------------------payload')
      const { payload } = response.data;
      return payload || response.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.code === "ECONNREFUSED") {
          logger.error(`Connection refused from ${error.config?.url}`);
          throw new InternalServerError();
        }
        if (error.response?.status === 500) {
          logger.error(
            `Error occured at ${
              error.config?.url
            } with response: ${JSON.stringify(error.response.data)}`
          );
          throw new InternalServerError();
        } else if (error.response?.status === 502) {
          logger.error(`Server down for ${error.config?.url}`);
          throw new InternalServerError();
        } else if (error.response?.status === 404) {
          logger.error(
            `Route not found for internal call ${error.config?.url}`
          );
          throw new InternalServerError();
        }
        if (error.response) {
          console.log("err from apiService>>>>", error);
          console.log("err response from apiService>>>>", error.response);
          const {
            status,
            data: { message },
          } = error.response;
          throw new errorClassObj[status satisfies keyof IErrorClassObj](
            message
          );
        }
      }
      throw error;
    }
  }
}

export const ums = new SecureMicroApi(UMS_BE_BASE_URL!);
