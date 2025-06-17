import { desc, eq } from 'drizzle-orm';
import { db } from './db';
import { documents, type Document, type NewDocument } from '@/db/schema';
import { generateEmbedding } from './embedding';

/**
 * Add a new document to our vector database
 */
export const addDocument = async (doc: Omit<NewDocument, 'embedding'>): Promise<Document> => {
  try {
    // Generate embedding for the document content
    const embedding = await generateEmbedding(doc.content);
    
    const [newDoc] = await db
      .insert(documents)
      .values({
        ...doc,
        embedding,
      })
      .returning();

    return newDoc;
  } catch (error) {
    console.error('Error adding document:', error);
    throw new Error('Failed to add document');
  }
};

/**
 * Get all documents (useful for management interfaces)
 */
export const getAllDocuments = async (): Promise<Document[]> => {
  return await db.select().from(documents).orderBy(desc(documents.createdAt));
};

/**
 * Delete a document by ID
 */
export const deleteDocument = async (id: number): Promise<void> => {
  await db.delete(documents).where(eq(documents.id, id));
};

/**
 * Update a document and regenerate its embedding
 */
export const updateDocument = async (
  id: number,
  updates: Partial<Omit<NewDocument, 'embedding'>>
): Promise<Document> => {
  let embedding: number[] | undefined;
  
  // If content is being updated, regenerate the embedding
  if (updates.content) {
    embedding = await generateEmbedding(updates.content);
  }
  
  const [updatedDoc] = await db
    .update(documents)
    .set({
      ...updates,
      ...(embedding && { embedding }),
      updatedAt: new Date(),
    })
    .where(eq(documents.id, id))
    .returning();
    
  return updatedDoc;
};

// @TODO: Introduce functions for vector search