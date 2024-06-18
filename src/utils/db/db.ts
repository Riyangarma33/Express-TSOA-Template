import knexConfig from "@db/knexfile";
import Knex from "knex";

const env = process.env.NODE_ENV || "development";
const configOptions = knexConfig[env];

const db = Knex(configOptions);

export default db;
