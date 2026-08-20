const fs = require('fs');
const path = require('path');
const db = require('./connect');

const MIGRATIONS_DIR = path.join(__dirname, 'migrations');

async function run() {
  // Track which migrations have already run
  await db.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename   VARCHAR(255) PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `);

  const { rows } = await db.query('SELECT filename FROM schema_migrations');
  const applied = new Set(rows.map((r) => r.filename));

  const files = fs
    .readdirSync(MIGRATIONS_DIR)
    .filter((f) => f.endsWith('.sql'))
    .sort();

  let count = 0;

  for (const file of files) {
    if (applied.has(file)) {
      console.log(`- skipping ${file} (already applied)`);
      continue;
    }

    const sql = fs.readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8');
    const client = await db.getClient();

    try {
      await client.query('BEGIN');
      await client.query(sql);
      await client.query(
        'INSERT INTO schema_migrations (filename) VALUES ($1)',
        [file]
      );
      await client.query('COMMIT');
      console.log(`+ applied ${file}`);
      count++;
    } catch (err) {
      await client.query('ROLLBACK');
      console.error(`x failed ${file}:`, err.message);
      throw err;
    } finally {
      client.release();
    }
  }

  console.log(count === 0 ? 'Nothing to migrate.' : `Done. ${count} migration(s) applied.`);
  await db.pool.end();
}

run().catch((err) => {
  console.error('Migration failed.');
  process.exit(1);
});