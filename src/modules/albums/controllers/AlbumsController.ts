import { Request, Response, NextFunction } from 'express';
import CreateAlbumService from '@modules/albums/services/CreateAlbumService';
import ListAlbumService from '@modules/albums/services/ListAlbumService';
import ShowAlbumService from '@modules/albums/services/ShowAlbumService';
import UpdateAlbumService from '@modules/albums/services/UpdateAlbumService';
import DeleteAlbumService from '@modules/albums/services/DeleteAlbumService';

export default class AlbumsController {
    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const listAlbums = new ListAlbumService();
            const albums = await listAlbums.execute();
            return response.json(albums);
        } catch (err) {
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { title, artist, price, stock } = request.body;
            const createAlbum = new CreateAlbumService();
            const album = await createAlbum.execute({ title, artist, price, stock });
            return response.json(album);
        } catch (err) {
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const showAlbum = new ShowAlbumService();
            const album = await showAlbum.execute(id);
            return response.json(album);
        } catch (err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const { title, artist, price, stock } = request.body;
            const updateAlbum = new UpdateAlbumService();
            const album = await updateAlbum.execute({ id, title, artist, price, stock });
            return response.json(album);
        } catch (err) {
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const { id } = request.params;
            const deleteAlbum = new DeleteAlbumService();
            await deleteAlbum.execute(id);
            return response.status(204).send();
        } catch (err) {
            next(err);
        }
    }
}