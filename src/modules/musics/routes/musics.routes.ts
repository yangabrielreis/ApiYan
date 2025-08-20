import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import MusicController from '../controllers/MusicController';
import isAuthenticated from '../../../shared/middlewares/isAuthenticated';

const musicsRouter = Router();
const musicController = new MusicController();

musicsRouter.get('/', isAuthenticated, async (req, res, next) => {
	try {
		await musicController.index(req, res, next);
	} catch (err) {
		next(err);
	}
});

musicsRouter.get(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.PARAMS]: { id: Joi.string().uuid().required() },
	}),
	async (req, res, next) => {
		try {
			await musicController.show(req, res, next);
		} catch (err) {
			next(err);
		}
	}
);

musicsRouter.post(
	'/',
	isAuthenticated,
	celebrate({
		[Segments.BODY]: {
			title: Joi.string().required(),
			artist: Joi.string().required(),
			genre: Joi.string().required(),
			release_date: Joi.string().required(),
			duration: Joi.number().required(),
			album_id: Joi.string().uuid().required(),
		},
	}),
	async (req, res, next) => {
		try {
			await musicController.create(req, res, next);
		} catch (err) {
			next(err);
		}
	}
);

musicsRouter.put(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.PARAMS]: { id: Joi.string().uuid().required() },
		[Segments.BODY]: {
			title: Joi.string().optional(),
			artist: Joi.string().optional(),
			genre: Joi.string().optional(),
			release_date: Joi.string().optional(),
			duration: Joi.number().optional(),
			album: Joi.any().optional(),
		},
	}),
	async (req, res, next) => {
		try {
			await musicController.update(req, res, next);
		} catch (err) {
			next(err);
		}
	}
);

musicsRouter.delete(
	'/:id',
	isAuthenticated,
	celebrate({
		[Segments.PARAMS]: { id: Joi.string().uuid().required() },
	}),
	async (req, res, next) => {
		try {
			await musicController.delete(req, res, next);
		} catch (err) {
			next(err);
		}
	}
);

export default musicsRouter;
