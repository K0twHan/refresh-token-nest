export class globalReturn {
    static success(message: string, data?: any) {
        return {
            status: 'success',
            message,
            data,
        };
    }

    static error(message: string, data?: any) {
        return {
            status: 'error',
            message,
            data,
        };
    }
}