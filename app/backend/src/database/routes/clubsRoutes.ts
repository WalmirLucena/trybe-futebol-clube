import { Router } from 'express';
import clubsController from '../controller/clubsController';

const clubsRoute = Router();

clubsRoute.get('/clubs/:id', clubsController.getById);
clubsRoute.get('/clubs', clubsController.getAll);

export default clubsRoute;
