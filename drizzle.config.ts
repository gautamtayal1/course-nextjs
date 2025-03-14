import { defineConfig } from "drizzle-kit"
import { env } from "@/data/env/server"

export default defineConfig({
  out: "./src/drizzle/migrations",
  schema: "./src/drizzle/schema.ts",
  strict: true,  
  verbose: true,
  dialect: "postgresql",
  dbCredentials: {
    password: env.DB_PASSWORD!,
    host: env.DB_HOST!,
    user: env.DB_USER!,
    database: env.DB_NAME!,
    ssl: false,
  },
})