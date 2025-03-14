import {drizzle} from "drizzle-orm/node-postgres"
import { env } from "@/data/env/server"
import * as schema from "./schema"

export const db = drizzle({
  schema,
  connection: {
    password: env.DB_PASSWORD!,
    host: env.DB_HOST!,
    user: env.DB_USER!,
    database: env.DB_NAME!,
  },
})