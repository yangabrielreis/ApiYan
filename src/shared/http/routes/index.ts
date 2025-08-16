import { Router } from "express";
import albumsRouter from "@modules/albums/routes/albums.routes";

const routes = Router();
routes.get('/', (request, response) =>{
    response.json({message: 'Hello Dev!'});
    return;
})

routes.use('/albums', albumsRouter);

export default routes;