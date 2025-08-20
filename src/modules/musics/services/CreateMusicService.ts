import { getCustomRepository, getRepository } from "typeorm";
import MusicsRepository from "../typeorm/repositories/MusicsRepository";
import Music from "../typeorm/entities/Music";
import Album from "../../albums/typeorm/entities/Album";

interface IRequest {
    title: string;
    artist: string;
    genre: string;
    release_date: string;
    duration: number;
    album_id: string;
}

export default class CreateMusicService {
    public async execute({ title, artist, genre, release_date, duration, album_id }: IRequest): Promise<Music> {
        const musicsRepository = getCustomRepository(MusicsRepository);
        const musicExists = await musicsRepository.findByTitle(title);
        if (musicExists) {
            throw new Error('There is already one music with this title.');
        }
        let albumObj;
        if (album_id) {
            const albumRepository = getRepository(Album);
            albumObj = await albumRepository.findOne(album_id);
        }
        const music = musicsRepository.create({
            title,
            artist,
            genre,
            release_date,
            duration,
            album: albumObj,
        });
        await musicsRepository.save(music);
        return music;
    }
}
