import { createOpenAI } from '@ai-sdk/openai';
import { embed, embedMany } from 'ai';

const ollama = createOpenAI({
  baseURL: process.env.OLLAMA_BASE_URL || "http://localhost:11434/v1",
  apiKey: "ollama",
});

/**
 * Generate vector embeddings for text using OpenAI's embedding model
 * Embeddings capture the semantic meaning of text as numerical vectors
 */
export const generateEmbedding = async (text: string): Promise<number[]> => {
  try {
    // Clean the text by removing line breaks and extra whitespace
    const cleanText = text.replace(/\n/g, ' ').trim();
    
    if (!cleanText) {
      throw new Error('Text cannot be empty');
    }

    const response = await embed({
        model: ollama.embedding('nomic-embed-text:latest'), // OpenAI's most cost-effective embedding model
        value: cleanText,
    });

    return response.embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error('Failed to generate embedding');
  }
};

export const generateEmbeddings = async (source: string[]): Promise<number[][]> => {
  try {

    const response = await embedMany({
        model: ollama.embedding('nomic-embed-text:latest'), // OpenAI's most cost-effective embedding model
        values: source,
    });

    return response.embeddings;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error('Failed to generate embedding');
  }
};