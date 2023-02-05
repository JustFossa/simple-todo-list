import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    content: String,
    type: {
        type: String,
        enum: ['todo', 'doing', 'completed'],
    },
    owner: String,
    board: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }
})

export const Task = mongoose.model('Task', TaskSchema);