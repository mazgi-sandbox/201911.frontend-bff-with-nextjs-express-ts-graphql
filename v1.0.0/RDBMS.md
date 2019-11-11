## RDBMS Operation

Generate migration.

```shellsession
docker-compose run bff npm run typeorm -- migration:generate --name Initialize
Starting v100_mysql_1 ... done

> bff@0.0.0 typeorm /workspace
> ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js "migration:generate" "--name" "Initialize"

Migration /workspace/db/migrations/1573491850633-Initialize.ts has been generated successfully.
```

Run migration.

```shellsession
docker-compose run bff npm run typeorm -- migration:run
Starting v100_mysql_1 ... done

> bff@0.0.0 typeorm /workspace
> ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js "migration:run"

query: SELECT * FROM `INFORMATION_SCHEMA`.`COLUMNS` WHERE `TABLE_SCHEMA` = 'bff' AND `TABLE_NAME` = 'migrations'
query: SELECT * FROM `bff`.`migrations` `migrations`
0 migrations are already loaded in the database.
1 migrations were found in the source code.
1 migrations are new migrations that needs to be executed.
query: START TRANSACTION
query: CREATE TABLE `user` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `displayName` varchar(255) NOT NULL, `hashedPassword` varchar(255) NULL, UNIQUE INDEX `IDX_065d4d8f3b5adb4a08841eae3c` (`name`), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), UNIQUE INDEX `IDX_059e69c318702e93998f26d152` (`displayName`), PRIMARY KEY (`id`)) ENGINE=InnoDB
query: INSERT INTO `bff`.`migrations`(`timestamp`, `name`) VALUES (?, ?) -- PARAMETERS: [1573491910307,"Initialize1573491910307"]
Migration Initialize1573491910307 has been executed successfully.
query: COMMIT
```

Reset migration.

```shellsession
docker-compose run mysql mysql -h mysql -u root -e 'DROP DATABASE bff'
docker-compose run mysql mysql -h mysql -u root -e 'CREATE DATABASE bff CHARACTER SET utf8mb4'
docker-compose run bff npm run typeorm -- migration:generate --name Initialize
Starting v100_mysql_1 ... done

> bff@0.0.0 typeorm /workspace
> ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js "migration:generate" "--name" "Initialize"

Migration /workspace/db/migrations/1573491702872-Initialize.ts has been generated successfully.
```
