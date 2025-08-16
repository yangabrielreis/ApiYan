import { Request, Response, NextFunction } from 'express';
import CreateAlbumService from 'src/modules/services/CreateAlbumService';
import ListAlbumService from 'src/modules/services/ListAlbumService';
import ShowAlbumService from 'src/modules/services/ShowAlbumService';
import UpdateAlbumService from 'src/modules/services/UpdateAlbumService';
import DeleteAlbumService from 'src/modules/services/DeleteAlbumService';

export default class AlbumsController {
    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        const listAlbums = new ListAlbumService();
        const albums = await listAlbums.execute();
        return response.json(albums);
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        const { title, artist, price, stock } = request.body;
        const createAlbum = new CreateAlbumService();
        const album = await createAlbum.execute({ title, artist, price, stock });
        return response.json(album);
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        const { id } = request.params;
        const showAlbum = new ShowAlbumService();
        const album = await showAlbum.execute(id);
        return response.json(album);
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        const { id } = request.params;
        const { title, artist, price, stock } = request.body;
        const updateAlbum = new UpdateAlbumService();
        const album = await updateAlbum.execute({ id, title, artist, price, stock });
        return response.json(album);
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        const { id } = request.params;
        const deleteAlbum = new DeleteAlbumService();
        await deleteAlbum.execute(id);
        return response.status(204).send();
    }
}