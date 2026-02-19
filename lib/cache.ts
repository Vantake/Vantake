/**
 * Centralized cache/revalidation config.
 * Use these values across API routes and server components to keep behavior consistent.
 */
export const REVALIDATE = {
  markets: 30,        // seconds
  leaderboard: 30,    // seconds
  trader: 30,         // seconds
} as const
