import { Router } from 'express';
import matchsController from '../controller/matchsController';

const matchsRoute = Router();

matchsRoute.get('/', matchsController.getAll);

export default matchsRoute;
