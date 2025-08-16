import { getCustomRepository } from "typeorm";
import AlbumsRepository from "../albums/typeorm/repositories/AlbumsRepository";
import Album from "../albums/typeorm/entities/Album";

export default class ListAlbumService {
    public async execute(): Promise<Album[]> {
        const albumsRepository = getCustomRepository(AlbumsRepository);
        const albums = await albumsRepository.find();
        return albums;
    }
}
