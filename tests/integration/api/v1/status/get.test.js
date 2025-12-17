test("GET to /api/v1/status returns status 200", async () => {
    const response = await fetch("http://localhost:3000/api/v1/status");
    expect(response.status).toBe(200);

    const responseBody = await response.json();
    expect(responseBody.update_at).toBeDefined();
    expect(responseBody.dependencies.database.version).toBeDefined();
    expect(responseBody.dependencies.database.max_connections).toBeDefined();
    expect(responseBody.dependencies.database.open_connections).toBeDefined();

    const parseUpdateAt = new Date(responseBody.update_at).toISOString();
    expect(responseBody.update_at).toEqual(parseUpdateAt);

    //expect(responseBody.dependencies.database.version).toBe("16.0");
    expect(responseBody.dependencies.database.max_connections).toBeGreaterThan(
        0,
    );
    expect(responseBody.dependencies.database.open_connections).toBe(1);
});
