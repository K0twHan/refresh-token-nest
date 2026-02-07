import { ArgumentsHost, Catch, HttpException, HttpStatus, Logger } from "@nestjs/common";
import { Prisma } from "generated/prisma/client";


@Catch()
export class AllExceptionsFilter {
    private readonly logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown , host : ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message : string |string[] = 'Internal server error';
        let error = 'Internal server error';

        if (exception instanceof HttpException)
        {
            status = exception.getStatus();
            const exceptionResponse = exception.getResponse();
           if(typeof exceptionResponse === 'string')
           {
            message = exceptionResponse;
            error = this.getErrorName(status);
           }
           else if(typeof exceptionResponse === 'object')
              {
                message = (exceptionResponse  as any).message || exception.message;
                error = (exceptionResponse as any).error || this.getErrorName(status);
              }  
        }
        else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      status = HttpStatus.BAD_REQUEST;
      error = 'Database Error';
      
      // Prisma error kodlarını anlamlı mesajlara çevir
      switch (exception.code) {
        case 'P2002':
          // Unique constraint hatası
          const field = exception.meta?.target as string[];
          message = field 
            ? `${field[0]} already exists` 
            : 'Duplicate entry';
          break;
        case 'P2025':
          // Record not found
          status = HttpStatus.NOT_FOUND;
          message = 'Record not found';
          error = 'Not Found';
          break;
        case 'P2003':
          // Foreign key constraint
          message = 'Foreign key constraint failed';
          break;
        case 'P2014':
          // Invalid ID
          message = 'Invalid ID provided';
          break;
        default:
          message = 'Database operation failed';
      }
    }
    // 3. Prisma Validation Error
    else if (exception instanceof Prisma.PrismaClientValidationError) {
      status = HttpStatus.BAD_REQUEST;
      message = 'Validation error';
      error = 'Bad Request';
    }
        else if (exception instanceof Error) {
      message = exception.message;
    }

    const errorResponse = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message,
      error,
      // Production'da stack trace gösterme
      ...(process.env.NODE_ENV === 'development' && exception instanceof Error && {
        stack: exception.stack,
      }),
    };

    // Log the error
    this.logger.error(
      `${request.method} ${request.url}`,
      exception instanceof Error ? exception.stack : JSON.stringify(exception),
    );

    response.status(status).json(errorResponse);
  }

  private getErrorName(status: number): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'Bad Request';
      case HttpStatus.UNAUTHORIZED:
        return 'Unauthorized';
      case HttpStatus.FORBIDDEN:
        return 'Forbidden';
      case HttpStatus.NOT_FOUND:
        return 'Not Found';
      case HttpStatus.CONFLICT:
        return 'Conflict';
      case HttpStatus.UNPROCESSABLE_ENTITY:
        return 'Unprocessable Entity';
      default:
        return 'Internal Server Error';
    }
  }
    }
