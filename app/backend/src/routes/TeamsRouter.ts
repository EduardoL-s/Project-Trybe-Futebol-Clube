import { Router } from 'express';
import TeamsControllers from 'src/controllers/TeamsControllers';

const TeamsRouter = Router();

TeamsRouter.get('/', TeamsControllers.getAll());

export default TeamsRouter;
