import AppError from "@shared/errors/AppErrors";
import { getCustomRepository } from "typeorm";
import Album from "../albums/typeorm/entities/Album";
import AlbumsRepository from "../albums/typeorm/repositories/AlbumsRepository";

interface IRequest {
    title: string;
    artist: string;
    price: number;
    stock: number;
}

export default class CreateAlbumService {
    public async execute({ title, artist, price, stock }: IRequest): Promise<Album> {
        const albumsRepository = getCustomRepository(AlbumsRepository);
        const albumExists = await albumsRepository.findByTitle(title);

        if (albumExists) {
            throw new AppError('There is already one album with this title.');
        }

        const album = albumsRepository.create({
            title,
            artist,
            price,
            stock,
        });

        await albumsRepository.save(album);
        return album;
    }
}
