import {neon} from "@neondatabase/serverless";
import {drizzle} from "drizzle-orm/neon-http";
import * as schema from "./schema";
import * as dotenv from "dotenv";

dotenv.config({
  path: ".env.local",
});

const sql = neon(process.env.POSTGRES_URL || "postgresql://neondb_owner:npg_SET9XZOvip6F@ep-frosty-haze-a29vg7nq-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require");
export const db = drizzle(sql, {schema, logger: true});


