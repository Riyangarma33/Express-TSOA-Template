import type { Knex } from "knex";

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "sqlite3",
    connection: {
      filename: "../../../db/dev.sqlite3",
    },
    useNullAsDefault: true,
    migrations: {
      directory: "./migrations",
      name: "migrations",
      tableName: "create_tables",
      extension: "ts",
    },
  },
};

export default config;
