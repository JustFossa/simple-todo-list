"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connect = async () => {
    mongoose_1.default.set('strictQuery', false);
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI, {
            useUnifiedTopology: true,
        });
        console.log('[DB] Database connected successfully');
    }
    catch (error) {
        console.log(error);
        console.log('Database connection failed');
    }
};
exports.default = connect;
