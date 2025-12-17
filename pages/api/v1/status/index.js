import database from "infra/database.js";

async function status(request, response) {
    const updateAt = new Date().toISOString();
    const getServerVersion = await database.query("SHOW server_version");
    const getMaxConnections = await database.query("SHOW max_connections");
    const getOpenConnections = await database.query({
        text: "SELECT COUNT(pid)::int as opened_connections FROM pg_stat_activity WHERE datname = $1;",
        values: [process.env.POSTGRES_DB],
    });

    response.status(200).json({
        update_at: updateAt,
        dependencies: {
            database: {
                version: getServerVersion.rows[0].server_version,
                max_connections: parseInt(
                    getMaxConnections.rows[0].max_connections,
                ),
                open_connections: getOpenConnections.rows[0].opened_connections,
            },
        },
    });
}

export default status;
