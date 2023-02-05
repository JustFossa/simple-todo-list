"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponse extends Error {
    statusCode;
    message;
    constructor(message, statusCode) {
        super();
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.default = ErrorResponse;
