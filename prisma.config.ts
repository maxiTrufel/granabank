import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    // process.env en vez de env(): env() falla si la variable no existe, y
    // `prisma generate` (que corre en el build) no necesita la base.
    url: process.env.DATABASE_URL ?? "",
  },
});
