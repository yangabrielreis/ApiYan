import { getCustomRepository } from "typeorm";
import AlbumsRepository from "../typeorm/repositories/AlbumsRepository";
import AppError from "@shared/errors/AppErrors";

export default class DeleteAlbumService {
    public async execute(id: string): Promise<void> {
        const albumsRepository = getCustomRepository(AlbumsRepository);
        const album = await albumsRepository.findOne(id);
        if (!album) {
            throw new AppError('Album not found.', 404);
        }
        await albumsRepository.remove(album);
    }
}
