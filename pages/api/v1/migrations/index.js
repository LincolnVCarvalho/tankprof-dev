import migrationRunner from "node-pg-migrate";
import { join } from "path";

export default async function migrations(request, response) {
    const defaultMigrationsConfig = {
        databaseUrl: process.env.DATABASE_URL,
        dryRun: true,
        dir: join("infra", "migrations"),
        direction: "up",
        verbose: true,
    };

    if (request.method === "GET") {
        const pendingMigrations = await migrationRunner(
            defaultMigrationsConfig,
        );
        return response.status(200).json(pendingMigrations);
    }

    if (request.method === "POST") {
        const migratedMigrations = await migrationRunner({
            ...defaultMigrationsConfig,
            dryRun: false,
        });

        if (migratedMigrations.length > 0) {
            return response.status(201).json(migratedMigrations);
        }

        return response.status(200).json(migratedMigrations);
    }

    return response.status(405).json({ error: "Method not allowed" });
}
