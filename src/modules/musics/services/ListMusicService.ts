import { getCustomRepository } from "typeorm";
import MusicsRepository from "../typeorm/repositories/MusicsRepository";
import Music from "../typeorm/entities/Music";

export default class ListMusicService {
    public async execute(): Promise<Music[]> {
        const musicsRepository = getCustomRepository(MusicsRepository);
        const musics = await musicsRepository.find();
        return musics;
    }
}
