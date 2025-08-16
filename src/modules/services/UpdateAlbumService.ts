import { getCustomRepository } from "typeorm";
import AlbumsRepository from "../albums/typeorm/repositories/AlbumsRepository";
import Album from "../albums/typeorm/entities/Album";
import AppError from "../../shared/errors/AppErrors";

interface IRequest {
    id: string;
    title: string;
    artist: string;
    price: number;
    stock: number;
}

export default class UpdateAlbumService {
    public async execute({ id, title, artist, price, stock }: IRequest): Promise<Album> {
        const albumsRepository = getCustomRepository(AlbumsRepository);
        const album = await albumsRepository.findOne(id);
        if (!album) {
            throw new AppError('Album not found.', 404);
        }
        album.title = title;
        album.artist = artist;
        album.price = price;
        album.stock = stock;
        await albumsRepository.save(album);
        return album;
    }
}
