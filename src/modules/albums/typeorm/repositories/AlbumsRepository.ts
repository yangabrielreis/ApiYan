import { EntityRepository, Repository } from "typeorm";
import Album from "../entities/Album";

@EntityRepository(Album)
export default class AlbumsRepository extends Repository<Album> {
    public async findByTitle(title: string): Promise<Album | undefined> {
        const album = this.findOne({
            where: { title },
        });
        return album;
    }
}
