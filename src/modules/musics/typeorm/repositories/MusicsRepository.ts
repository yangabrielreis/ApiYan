import { EntityRepository, Repository } from "typeorm";
import Music from "../entities/Music";

@EntityRepository(Music)
export default class MusicsRepository extends Repository<Music> {
    public async findAlbumById(album_id: string): Promise<Music[] | undefined> {
        return this.find({ where: { album_id } });
    }
    public async findByTitle(title: string): Promise<Music | undefined> {
        return this.findOne({ where: { title } });
    }

}
