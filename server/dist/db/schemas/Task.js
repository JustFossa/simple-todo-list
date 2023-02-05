"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Task = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const TaskSchema = new mongoose_1.default.Schema({
    content: String,
    type: {
        type: String,
        enum: ['todo', 'doing', 'completed'],
    },
    owner: String,
    board: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'Board'
    }
});
exports.Task = mongoose_1.default.model('Task', TaskSchema);
