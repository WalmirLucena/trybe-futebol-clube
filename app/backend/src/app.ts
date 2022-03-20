import * as express from 'express';
import clubsRoute from './database/routes/clubsRoutes';
import route from './database/routes/userRoutes';

class App {
  public app: express.Express;
  // ...

  constructor() {
    // ...
    this.app = express();
    this.config();
    /* this.rotas(); */
    // ...
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(accessControl);
    this.app.use(express.json());
    // ...
  }

  /*  private rotas(): void {
    this.app.use(route);
  } */

  // ...
  public start(PORT: string | number):void {
    // ...
    this.app.use(route);
    this.app.use(clubsRoute);
    this.app.listen(PORT, () => console.log(`Rodando na porta: ${PORT}`));
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
