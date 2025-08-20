import { Router } from "express";
import albumsRouter from "@modules/albums/routes/albums.routes";
import usersRouter from "@modules/users/routes/users.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import passwordRouter from "@modules/users/routes/password.routes";

const routes = Router();
routes.get('/', (request, response) =>{
    response.json({message: 'Hello Dev!'});
    return;
})

routes.use('/albums', albumsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

export default routes;