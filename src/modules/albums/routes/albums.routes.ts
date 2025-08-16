import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AlbumsController from '../controllers/AlbumsController';

const albumsRouter = Router();
const albumsController = new AlbumsController();

albumsRouter.get('/', albumsController.index);

albumsRouter.get(
    '/:id',
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    }),
    albumsController.show
);

albumsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().required(),
            artist: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            stock: Joi.number().required(),
        },
    }),
    albumsController.create
);

albumsRouter.put(
    '/:id',
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
        [Segments.BODY]: {
            title: Joi.string().optional(),
            artist: Joi.string().optional(),
            price: Joi.number().precision(2).optional(),
            stock: Joi.number().optional(),
        },
    }),
    albumsController.update
);

albumsRouter.delete(
    '/:id',
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    }),
    albumsController.delete
);

export default albumsRouter;