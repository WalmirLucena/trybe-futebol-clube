import { Router } from 'express';
import matchsController from '../controller/matchsController';
import equalTeams from '../middlewares/clubsValidations';

const matchsRoute = Router();

matchsRoute.get('/', matchsController.getAll);
matchsRoute.post('/', equalTeams, matchsController.create);
matchsRoute.patch('/:id/finish', matchsController.finishMatch);

export default matchsRoute;
