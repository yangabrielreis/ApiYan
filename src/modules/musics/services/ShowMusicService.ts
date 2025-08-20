import { getCustomRepository } from "typeorm";
import MusicsRepository from "../typeorm/repositories/MusicsRepository";
import Music from "../typeorm/entities/Music";

export default class ShowMusicService {
    public async execute(id: string): Promise<Music> {
        const musicsRepository = getCustomRepository(MusicsRepository);
        const music = await musicsRepository.findOne(id);
        if (!music) {
            throw new Error('Music not found.');
        }
        return music;
    }
}
