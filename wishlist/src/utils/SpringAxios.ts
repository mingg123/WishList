import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { springDevRootURL } from "../common/Constants";

interface ProObjectError extends AxiosError {
  statusCode: string;
}

export function isProObjectError(
  result: ProObjectError | AxiosResponse<any>
): result is ProObjectError {
  return (result as AxiosResponse<any>).status !== 200;
}

interface SpringAxiosInstance extends AxiosInstance {
  request<T = any, R = AxiosResponse<T>>(
    config: AxiosRequestConfig
  ): Promise<R>;
  get<T extends object, R = AxiosResponse<T> | ProObjectError>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R>;
  delete<T extends object, R = AxiosResponse<T> | ProObjectError>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R>;
  head<T extends object, R = AxiosResponse<T> | ProObjectError>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R>;
  options<T extends object, R = AxiosResponse<T> | ProObjectError>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<R>;
  post<T extends object, R = AxiosResponse<T> | ProObjectError>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R>;
  put<T extends object, R = AxiosResponse<T> | ProObjectError>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R>;
  patch<T extends object, R = AxiosResponse<T> | ProObjectError>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<R>;
}

export const WishListAxios: SpringAxiosInstance = axios.create({
  baseURL: `${springDevRootURL}`,
});
