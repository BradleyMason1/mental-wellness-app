const { Pool } = require('pg'); // Assuming PostgreSQL is used
const pool = new Pool({
    user: 'your_user',
    host: 'localhost',
    database: 'your_database',
    password: 'your_password',
    port: 5432,
});

// Function to create tables
async function createTables() {
    const createResourcesTable = `
        CREATE TABLE IF NOT EXISTS Resources (
            ResourceID SERIAL PRIMARY KEY,
            Title VARCHAR(255) NOT NULL,
            Description TEXT,
            ResourceType VARCHAR(10) CHECK (ResourceType IN ('Article', 'Video')) NOT NULL,
            URL VARCHAR(255) NOT NULL,
            IsBroken BOOLEAN DEFAULT FALSE,
            CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    `;

    const createCategoriesTable = `
        CREATE TABLE IF NOT EXISTS ResourceCategories (
            CategoryID SERIAL PRIMARY KEY,
            CategoryName VARCHAR(100) NOT NULL
        );
    `;

    const createMappingTable = `
        CREATE TABLE IF NOT EXISTS ResourceCategoryMapping (
            ResourceID INT,
            CategoryID INT,
            PRIMARY KEY (ResourceID, CategoryID),
            FOREIGN KEY (ResourceID) REFERENCES Resources(ResourceID) ON DELETE CASCADE,
            FOREIGN KEY (CategoryID) REFERENCES ResourceCategories(CategoryID) ON DELETE CASCADE
        );
    `;

    await pool.query(createResourcesTable);
    await pool.query(createCategoriesTable);
    await pool.query(createMappingTable);
}

// Function to list resources with filters
async function listResources(searchTerm) {
    const query = `
        SELECT r.ResourceID, r.Title, r.Description, r.ResourceType, r.URL
        FROM Resources r
        JOIN ResourceCategoryMapping rcm ON r.ResourceID = rcm.ResourceID
        JOIN ResourceCategories rc ON rcm.CategoryID = rc.CategoryID
        WHERE r.IsBroken = FALSE
        AND (r.Title ILIKE $1 OR rc.CategoryName ILIKE $1)
        ORDER BY r.CreatedAt DESC;
    `;
    const values = [`%${searchTerm}%`];
    const res = await pool.query(query, values);
    return res.rows;
}

// Example
(async () => {
    await createTables();
    const resources = await listResources('search_term');
    console.log(resources);
})();

