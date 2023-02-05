class ErrorResponse extends Error {
    statusCode: number;
    message: any;

    constructor(message: any, statusCode: number) {
        super()
        this.statusCode = statusCode;
        this.message = message;
    }
}

export default ErrorResponse;