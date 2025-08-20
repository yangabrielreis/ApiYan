import { getCustomRepository } from "typeorm";
import AlbumsRepository from "../typeorm/repositories/AlbumsRepository";
import Album from "../typeorm/entities/Album";

export default class ListAlbumService {
    public async execute(): Promise<Album[]> {
        const albumsRepository = getCustomRepository(AlbumsRepository);
        const albums = await albumsRepository.find();
        return albums;
    }
}
