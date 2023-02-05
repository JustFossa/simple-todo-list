import { createBoard, getBoard, createTask, deleteBoard, deleteTask, changeTaskType, changeTaskOrder} from '../controllers';
import { Router } from 'express';

const router = Router();

router.route('/:ownerId').post(createBoard)
router.route('/:ownerId/:id').get(getBoard).delete(deleteBoard);
router.route('/:ownerId/:id/tasks').post(createTask);
router.route('/:ownerId/:id/tasks/:taskId').delete(deleteTask);
router.route('/:ownerId/:id/tasks/:taskId/:taskType').patch(changeTaskType);
router.route('/:ownerId/:id/tasks/order/:type').post(changeTaskOrder);

export default router;