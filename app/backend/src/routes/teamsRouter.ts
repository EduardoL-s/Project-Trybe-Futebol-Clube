import { Router } from 'express';
import teamsControllers from 'src/controllers/teamsControllers';

const teamsRouter = Router();

teamsRouter.get('/', teamsControllers.getAll());

export default teamsRouter;
