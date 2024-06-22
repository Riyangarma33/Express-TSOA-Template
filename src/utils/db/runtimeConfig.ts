import knexConfig from "@db/knexfile";
import type { Knex } from "knex";

const env = process.env.NODE_ENV || "development";
const configOptions = knexConfig[env];

const config: { [key: string]: Knex.Config } = {
  development: {
    client: configOptions["client"],
    connection: {
      filename: "./db/dev.sqlite3",
    },
    useNullAsDefault: true,
  },
};

export default config;
