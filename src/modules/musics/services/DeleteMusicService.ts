import { getCustomRepository } from "typeorm";
import MusicsRepository from "../typeorm/repositories/MusicsRepository";

export default class DeleteMusicService {
    public async execute(id: string): Promise<void> {
        const musicsRepository = getCustomRepository(MusicsRepository);
        const music = await musicsRepository.findOne(id);
        if (!music) {
            throw new Error('Music not found.');
        }
        await musicsRepository.remove(music);
    }
}
