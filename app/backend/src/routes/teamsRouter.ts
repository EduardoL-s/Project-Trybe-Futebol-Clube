import { Router } from 'express';
import teamsControllers from '../controllers/teamsControllers';

const teamsRouter = Router();

teamsRouter.get('/', teamsControllers.getAll);
teamsRouter.get('/:id', teamsControllers.getById);

export default teamsRouter;
