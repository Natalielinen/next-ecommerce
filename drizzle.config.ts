import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

dotenv.config({
  path: ".env.local",
});

const config: Config = {
  dialect: "postgresql",
  schema: "./server/schema.ts",
  out: "./server/migrations.ts",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
};

export default config;