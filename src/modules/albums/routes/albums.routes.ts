import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import AlbumsController from '../controllers/AlbumsController';
import isAuthenticated from '../../../shared/middlewares/isAuthenticated';

const albumsRouter = Router();
const albumsController = new AlbumsController();

albumsRouter.get('/', isAuthenticated, async (req, res, next) => {
    try {
        await albumsController.index(req, res, next);
    } catch (err) {
        next(err);
    }
});

albumsRouter.get(
    '/:id',
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    }),
    async (req, res, next) => {
        try {
            await albumsController.show(req, res, next);
        } catch (err) {
            next(err);
        }
    }
);

albumsRouter.post(
    '/',
    isAuthenticated,
    celebrate({
        [Segments.BODY]: {
            title: Joi.string().required(),
            artist: Joi.string().required(),
            price: Joi.number().precision(2).required(),
            stock: Joi.number().required(),
        },
    }),
    async (req, res, next) => {
        try {
            await albumsController.create(req, res, next);
        } catch (err) {
            next(err);
        }
    }
);

albumsRouter.put(
    '/:id',
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
        [Segments.BODY]: {
            title: Joi.string().optional(),
            artist: Joi.string().optional(),
            price: Joi.number().precision(2).optional(),
            stock: Joi.number().optional(),
        },
    }),
    async (req, res, next) => {
        try {
            await albumsController.update(req, res, next);
        } catch (err) {
            next(err);
        }
    }
);

albumsRouter.delete(
    '/:id',
    isAuthenticated,
    celebrate({
        [Segments.PARAMS]: { id: Joi.string().uuid().required() },
    }),
    async (req, res, next) => {
        try {
            await albumsController.delete(req, res, next);
        } catch (err) {
            next(err);
        }
    }
);

export default albumsRouter;