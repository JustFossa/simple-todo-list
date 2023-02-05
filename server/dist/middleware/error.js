"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const errorHandler = (err, req, res, next) => {
    let error = { ...err };
    error.message = err.message;
    if (err.code === 11000) {
        const message = "Duplicate field value entered";
        error = new errorResponse_1.default(message, 400);
    }
    if (err.name === "ValidationError") {
        const message = Object.values(err.errors).map((val) => val.message);
        error = new errorResponse_1.default(message, 400);
    }
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"
    });
};
exports.default = errorHandler;
