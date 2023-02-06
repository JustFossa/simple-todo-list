import { createBoard, getBoard, createTask, deleteBoard, deleteTask, changeTaskType, changeTaskOrder, changeCardOrder, changeTaskContent} from '../controllers';
import { Router } from 'express';

const router = Router();

router.route('/:ownerId').post(createBoard)
router.route('/:ownerId/:id').get(getBoard).delete(deleteBoard);
router.route('/:ownerId/:id/tasks').post(createTask);
router.route('/:ownerId/:id/tasks/:taskId').delete(deleteTask).post(changeTaskContent);
router.route('/:ownerId/:id/tasks/:taskId/:taskType').patch(changeTaskType);
router.route('/:ownerId/:id/tasks/order/:type').post(changeTaskOrder);
router.route('/:ownerId/:id/order').post(changeCardOrder);

export default router;