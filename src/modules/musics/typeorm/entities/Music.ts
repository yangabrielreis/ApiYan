import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Album from '@modules/albums/typeorm/entities/Album';

@Entity('musics')
export default class Music {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    artist: string;

    @Column({ name: 'genre' })
    genre: string;

    @Column({ name: 'release_date', type: 'date' })
    release_date: string;

    @Column('int')
    duration: number;

    @ManyToOne(() => Album, album => album.id, { nullable: true, onDelete: 'SET NULL', onUpdate: 'CASCADE' })
    @JoinColumn({ name: 'album_id' })
    album: Album;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
