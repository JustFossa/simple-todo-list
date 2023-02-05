import {Board, Task} from '../db/schemas';
import {NextFunction, Request, Response} from 'express';
import ErrorResponse from '../utils/errorResponse';

export const getBoard = async(req: Request, res: Response, next: NextFunction) => {
    const {id, ownerId} = req.params;
    try {
        const board = await Board.findOne({_id: id, owner: ownerId}).populate('tasks.todo').populate('tasks.doing').populate('tasks.completed');;
        if (!board) {
            return next(new ErrorResponse('Board not found', 404));
        }
        
        res.status(200).json({success: true, data: board});
    } catch (error: any) {
        next(new ErrorResponse(error.message, 500));
    }
}

export const createBoard = async(req: Request, res: Response, next: NextFunction) => {
    const {ownerId} = req.params;
    try {
        const board = await Board.create({owner: ownerId});
        res.status(201).json({success: true, data: board});
    } catch (error: any) {
        next(new ErrorResponse(error.message, 500));
    }
}

export const deleteBoard = async(req: Request, res: Response, next: NextFunction) => {
    const {id, ownerId} = req.params;
    try {
        const board = await Board.findOneAndDelete({_id: id, owner: ownerId});
        if (!board) {
            return next(new ErrorResponse('Board not found', 404));
        }
        res.status(200).json({success: true, data: {}});
    } catch (error: any) {
        next(new ErrorResponse(error.message, 500));
    }
}

export const createTask = async(req: Request, res: Response, next: NextFunction) => {
    const {id, ownerId} = req.params;
    const {content, type}: {content: string, type: string} = req.body;
    if(!content || !type) {
        return next(new ErrorResponse('Content and type are required', 400));
    }
    try {
        const board = await Board.findOne({_id: id, owner: ownerId}) as any;
        if (!board) {
            return next(new ErrorResponse('Board not found', 404));
        }
        const task = await Task.create({content, type, owner: ownerId, board: board._id});
        board.tasks![type].push(task._id);
        await board.save();
        res.status(201).json({success: true, data: task});
    } catch (error: any) {
        next(new ErrorResponse(error.message, 500));
    }
}

export const deleteTask = async(req: Request, res: Response, next: NextFunction) => {
    const {id, ownerId, taskId} = req.params;
    try {
        const board = await Board.findOne({_id: id, owner: ownerId}).populate('tasks.todo').populate('tasks.doing').populate('tasks.completed');
        const task = await Task.findOne({_id: taskId, owner: ownerId});
        if (!board) {
            return next(new ErrorResponse('Board not found', 404));
        }
        if (!task) {
            return next(new ErrorResponse('Task not found', 404));
        }
        board.tasks![task.type!] = board.tasks![task.type!].filter((task: any) => task.id !== taskId);
        await board.save(); 
        await task.remove();
        res.status(200).json({success: true, data: board});
    } catch (error: any) {
        next(new ErrorResponse(error.message, 500));
    }
}

export const changeTaskType = async(req: Request, res: Response, next: NextFunction) => {
    let {id, ownerId, taskId, taskType} = req.params;
    if(!taskType) {
        return next(new ErrorResponse('Type is required', 400));
    }
    try {
        const task = await Task.findOne({_id: taskId, owner: ownerId});
        const board = await Board.findOne({_id: id, owner: ownerId}).populate('tasks.todo').populate('tasks.doing').populate('tasks.completed');
        if (!task) {
            return next(new ErrorResponse('Task not found', 404));
        }
        if (!board) {
            return next(new ErrorResponse('Board not found', 404));
        }
        let oldType = task.type;
        board.tasks![oldType!] = board.tasks![oldType!].filter((task: any) => {
            return task._id.toString() !== taskId;
        });
        task.type = taskType as "todo" | "doing" | "completed";
        board.tasks![taskType as "todo" | "doing" | "completed"].push(task._id);
        await board.save();
        await task.save();
        const response = {
            ...board.toObject(),
        }
        res.status(200).json({success: true, data: response});
    } catch (error: any) {
        next(new ErrorResponse(error.message, 500));
    }
}

export const changeTaskOrder = async(req: Request, res: Response, next: NextFunction) => {
    const {id, ownerId, type} = req.params;
    let tasks = req.body;
    if(!tasks) {
        return next(new ErrorResponse('Tasks are required', 400));
    }
    try {
        const board = await Board.findOne({_id: id, owner: ownerId}).populate('tasks.todo').populate('tasks.doing').populate('tasks.completed');
        if(!board) {
            return next(new ErrorResponse('Board not found', 404));
        }
        board.tasks![type as "doing" | "todo" | "completed"] = tasks[type];
        await board.save();
        
        res.status(200).json({success: true, data: board});
    } catch (error: any) {
        next(new ErrorResponse(error.message, 500));
    }
}