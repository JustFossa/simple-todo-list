"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
const mongoose_1 = require("mongoose");
const BoardSchema = new mongoose_1.Schema({
    id: String,
    owner: String,
    tasks: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Task'
        }]
});
exports.Board = (0, mongoose_1.model)('Board', BoardSchema);
