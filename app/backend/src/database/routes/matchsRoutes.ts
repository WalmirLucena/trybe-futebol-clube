import { Router } from 'express';
import matchsController from '../controller/matchsController';
import { validateClubs, validateMatchsToken } from '../middlewares/clubsValidations';

const matchsRoute = Router();

matchsRoute.get('/', matchsController.getAll);
matchsRoute.post(
  '/',
  validateClubs,
  validateMatchsToken,
  matchsController.findClubs,
  matchsController.create,
);
matchsRoute.patch('/:id', matchsController.updateTeamGoals);

matchsRoute.patch('/:id/finish', matchsController.finishMatch);

export default matchsRoute;
