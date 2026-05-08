export interface ApiResponseData<T> {
  success: boolean;
  data: T | null;
  meta?: PaginationMeta;
  error: ApiErrorInfo | null;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiErrorInfo {
  code: string;
  message: string;
  details?: unknown;
}

export class ApiResponse {
  static success<T>(data: T, meta?: PaginationMeta): ApiResponseData<T> {
    return {
      success: true,
      data,
      meta,
      error: null,
    };
  }

  static paginated<T>(
    data: T,
    total: number,
    page: number,
    limit: number
  ): ApiResponseData<T> {
    return {
      success: true,
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      error: null,
    };
  }

  static error(
    code: string,
    message: string,
    details?: unknown
  ): ApiResponseData<null> {
    return {
      success: false,
      data: null,
      error: { code, message, details },
    };
  }
}
