import { Router } from 'express';
import clubsController from '../controller/clubsController';

const clubsRoute = Router();

clubsRoute.get('/:id', clubsController.getById);
clubsRoute.get('/', clubsController.getAll);

export default clubsRoute;
