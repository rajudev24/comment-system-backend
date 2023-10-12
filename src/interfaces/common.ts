import { IGenericErrorMessage } from "./error";

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMeesages: IGenericErrorMessage[];
};

export type IGenericPaginationResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
