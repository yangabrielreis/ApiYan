import { getCustomRepository } from "typeorm";
import MusicsRepository from "../typeorm/repositories/MusicsRepository";
import Music from "../typeorm/entities/Music";

interface IRequest {
    id: string;
    title: string;
    artist: string;
    genre: string;
    release_date: string;
    duration: number;
    album?: any;
}

export default class UpdateMusicService {
    public async execute({ id, title, artist, genre, release_date, duration, album }: IRequest): Promise<Music> {
        const musicsRepository = getCustomRepository(MusicsRepository);
        const music = await musicsRepository.findOne(id);
        if (!music) {
            throw new Error('Music not found.');
        }
        music.title = title;
        music.artist = artist;
        music.genre = genre;
        music.release_date = release_date;
        music.duration = duration;
        music.album = album;
        await musicsRepository.save(music);
        return music;
    }
}
