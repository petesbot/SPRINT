// Declares the shape of Cloudflare bindings available via getRequestContext().env
// These must match the bindings defined in wrangler.toml
interface CloudflareEnv {
  DB: D1Database;
  SESSIONS: KVNamespace;
}
