import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/api-error';
import { ApiResponse } from '../utils/api-response';

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json(
      ApiResponse.error(err.code, err.message, err.details)
    );
    return;
  }

  console.error('Unhandled error:', err);
  res.status(500).json(
    ApiResponse.error('INTERNAL_ERROR', 'An unexpected error occurred')
  );
}
