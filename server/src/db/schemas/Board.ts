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
    }
    
})  

export const Board = model('Board', BoardSchema);