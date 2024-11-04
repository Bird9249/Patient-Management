import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";
config();
export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
});
