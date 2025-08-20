import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateMusics1755662092944 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "musics",
            columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                    generationStrategy: "uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name: "title",
                    type: "varchar",
                },
                {
                    name: "artist",
                    type: "varchar",
                },
                {
                    name: "album_id",
                    type: "uuid",
                    isNullable: true,
                },
                {
                    name: "genre",
                    type: "varchar",
                },
                {
                    name: "release_date",
                    type: "date",
                },
                {
                    name: "duration",
                    type: "int",
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: "updated_at",
                    type: "timestamp",
                    default: "now()"
                }
            ]
        }));

        await queryRunner.createForeignKey("musics", new TableForeignKey({
            columnNames: ["album_id"],
            referencedTableName: "albums",
            referencedColumnNames: ["id"],
            onDelete: "SET NULL",
            onUpdate: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable("musics");
        const foreignKey = table!.foreignKeys.find(fk => fk.columnNames.indexOf("album_id") !== -1);
        if (foreignKey) {
            await queryRunner.dropForeignKey("musics", foreignKey);
        }
        await queryRunner.dropTable("musics");
    }

}
