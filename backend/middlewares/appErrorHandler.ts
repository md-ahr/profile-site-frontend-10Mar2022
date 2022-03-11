import { Request, Response, RequestHandler, NextFunction, ErrorRequestHandler } from 'express';

export const notFound: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    const error: Error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

export const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response): void => {
    const statusCode: number = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
}
