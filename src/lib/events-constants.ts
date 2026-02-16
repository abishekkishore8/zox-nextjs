/**
 * Client-safe events constants (no DB/Redis imports).
 * Use this in 'use client' components instead of data-adapter.
 */

export const EVENTS_REGION_ORDER = [
  "Bengaluru",
  "Cohort",
  "Delhi NCR",
  "Dubai",
  "Hyderabad",
  "International Events",
  "Mumbai",
  "Other Cities",
  "Online",
] as const;
