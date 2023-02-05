"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const todo_1 = __importDefault(require("./todo"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.use('/todo', todo_1.default);
exports.default = router;
