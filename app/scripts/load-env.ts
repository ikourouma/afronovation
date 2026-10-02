// Loads app/.env.local when present so scripts use the same settings as the site.
try {
  process.loadEnvFile(".env.local");
} catch {
  // No .env.local: rely on variables already set in the shell.
}
