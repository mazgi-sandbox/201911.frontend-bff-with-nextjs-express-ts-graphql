import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1573491910307 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `user` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `displayName` varchar(255) NOT NULL, `hashedPassword` varchar(255) NULL, UNIQUE INDEX `IDX_065d4d8f3b5adb4a08841eae3c` (`name`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `IDX_059e69c318702e93998f26d152` (`displayName`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_059e69c318702e93998f26d152` ON `user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`", undefined);
        await queryRunner.query("DROP INDEX `IDX_065d4d8f3b5adb4a08841eae3c` ON `user`", undefined);
        await queryRunner.query("DROP TABLE `user`", undefined);
    }

}
