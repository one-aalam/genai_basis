import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@/db/schema';

// Create the connection
const connectionString = process.env.DATABASE_URL!;
const client = postgres(connectionString);

// Initialize Drizzle with our schema
export const db = drizzle(client, { schema })