import ErrorResponse from "../utils/errorResponse";

const errorHandler = (err: any, req: any, res: any, next: any) => {
    let error = { ...err };
    error.message = err.message;
    if(err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new ErrorResponse(message, 400);
    }
    if(err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val: any) => val.message);
        error = new ErrorResponse(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"
    })
}

export default errorHandler;