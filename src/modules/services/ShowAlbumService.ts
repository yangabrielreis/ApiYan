import { getCustomRepository } from "typeorm";
import AlbumsRepository from "../albums/typeorm/repositories/AlbumsRepository";
import Album from "../albums/typeorm/entities/Album";
import AppError from "../../shared/errors/AppErrors";

export default class ShowAlbumService {
    public async execute(id: string): Promise<Album> {
        const albumsRepository = getCustomRepository(AlbumsRepository);
        const album = await albumsRepository.findOne(id);
        if (!album) {
            throw new AppError('Album not found.', 404);
        }
        return album;
    }
}
