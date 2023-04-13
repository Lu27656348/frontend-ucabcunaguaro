import { config } from "dotenv";

config()

export const domain_url_env = process.env.API_DOMAIN || "http://restapi-postgres-sequelize-v3-production.up.railway.app";