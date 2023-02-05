"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.createTask = exports.deleteBoard = exports.createBoard = exports.getBoard = void 0;
const schemas_1 = require("../db/schemas");
const errorResponse_1 = __importDefault(require("../utils/errorResponse"));
const getBoard = async (req, res, next) => {
    const { id, ownerId } = req.params;
    try {
        const board = await schemas_1.Board.findOne({ _id: id, owner: ownerId }).populate('tasks');
        if (!board) {
            return next(new errorResponse_1.default('Board not found', 404));
        }
        const response = {
            id: board.id,
            owner: board.owner,
            todo: board.tasks.filter((task) => task.type === 'todo'),
            doing: board.tasks.filter((task) => task.type === 'doing'),
            completed: board.tasks.filter((task) => task.type === 'completed')
        };
        res.status(200).json({ success: true, data: response });
    }
    catch (error) {
        next(new errorResponse_1.default(error.message, 500));
    }
};
exports.getBoard = getBoard;
const createBoard = async (req, res, next) => {
    const { ownerId } = req.params;
    try {
        const board = await schemas_1.Board.create({ owner: ownerId });
        res.status(201).json({ success: true, data: board });
    }
    catch (error) {
        next(new errorResponse_1.default(error.message, 500));
    }
};
exports.createBoard = createBoard;
const deleteBoard = async (req, res, next) => {
    const { id, ownerId } = req.params;
    try {
        const board = await schemas_1.Board.findOneAndDelete({ _id: id, owner: ownerId });
        if (!board) {
            return next(new errorResponse_1.default('Board not found', 404));
        }
        res.status(200).json({ success: true, data: {} });
    }
    catch (error) {
        next(new errorResponse_1.default(error.message, 500));
    }
};
exports.deleteBoard = deleteBoard;
const createTask = async (req, res, next) => {
    const { id, ownerId } = req.params;
    const { content, type } = req.body;
    if (!content || !type) {
        return next(new errorResponse_1.default('Content and type are required', 400));
    }
    try {
        const board = await schemas_1.Board.findOne({ _id: id, owner: ownerId });
        if (!board) {
            return next(new errorResponse_1.default('Board not found', 404));
        }
        const task = await schemas_1.Task.create({ content, type, owner: ownerId, board: board._id });
        board.tasks.push(task._id);
        await board.save();
        res.status(201).json({ success: true, data: task });
    }
    catch (error) {
        next(new errorResponse_1.default(error.message, 500));
    }
};
exports.createTask = createTask;
const deleteTask = async (req, res, next) => {
    const { id, ownerId, taskId } = req.params;
    try {
        const board = await schemas_1.Board.findOne({ _id: id, owner: ownerId }).populate('tasks');
        const task = await schemas_1.Task.findOne({ _id: taskId, owner: ownerId });
        if (!board) {
            return next(new errorResponse_1.default('Board not found', 404));
        }
        if (!task) {
            return next(new errorResponse_1.default('Task not found', 404));
        }
        board.tasks = board.tasks.filter((task) => task.id !== taskId);
        await board.save();
        await task.remove();
        res.status(200).json({ success: true, data: board });
    }
    catch (error) {
        next(new errorResponse_1.default(error.message, 500));
    }
};
exports.deleteTask = deleteTask;
