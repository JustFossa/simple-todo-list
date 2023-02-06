import {Schema, model} from "mongoose";

const BoardSchema = new Schema({
    id: String,
    owner: String,
    tasks: {
        "todo": [{
            type: Schema.Types.ObjectId,
            ref: 'Task',
            required: true,
            default: []
        }],
        "doing": [{
            type: Schema.Types.ObjectId,
            ref: 'Task',
            required: true,
            default: []
        }],
        "completed": [{
            type: Schema.Types.ObjectId,
            ref: 'Task',
            required: true,
            default: []
        }],
    },
    cardOrder: {
        type: Array,
        default: ["todo", "doing", "completed"],
        required: true
    }
    
})  

export const Board = model('Board', BoardSchema);