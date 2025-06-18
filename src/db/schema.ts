import { index, pgTable, serial, text, timestamp, vector } from 'drizzle-orm/pg-core';

export const documents = pgTable(
  'documents',
  {
    id: serial('id').primaryKey(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    url: text('url'),
    // Vector embedding with 1536 dimensions (OpenAI's text-embedding-ada-002 size)
    embedding: vector('embedding', { dimensions: 1536 }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
  },
  (table) => [
    // HNSW index for fast vector similarity search
    // 'vector_cosine_ops' optimizes for cosine similarity
    index('embeddingIndex').using('hnsw', table.embedding.op('vector_cosine_ops')),
  ]
);

export type Document = typeof documents.$inferSelect;
export type NewDocument = typeof documents.$inferInsert;