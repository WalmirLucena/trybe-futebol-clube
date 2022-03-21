import { Router } from 'express';
import matchsController from '../controller/matchsController';

const matchsRoute = Router();

matchsRoute.get('/', matchsController.getAll);
matchsRoute.post('/', matchsController.create);
matchsRoute.patch('/:id/finish', matchsController.finishMatch);

export default matchsRoute;
