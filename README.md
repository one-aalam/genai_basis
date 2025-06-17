The Next.js boilerplate for your GenAI learning journey in the JS/TS ecosystem.

## The Tech Stack: Why These Choices?
A carefully chosen stack that balances learning with practicality:

- **Next.js 14**: App Router for modern React patterns
- **Vercel AI SDK**: Handles the tricky LLM integration stuff
- **Supabase**: PostgreSQL with built-in vector search (no separate vector DB needed!)
- **OpenAI**: For embeddings and chat completions
- **TypeScript**: Because we're professionals here 😉

This stack gets you productive fast while helping you in learning patterns you'll use in real projects.

### Environment Setup
Create a `.env.local` file with your API keys:

```bash
# .env.local
OPENAI_API_KEY=your_openai_api_key_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
DATABASE_URL=your_supabase_database_connection_string
```

**Getting your keys**:

- **OpenAI**: Sign up at [platform.openai.com](https://platform.openai.com), create an API key
- **Supabase**: Create a free project at [supabase.com](https://supabase.com), grab the URL and anon key from your project settings
- **Database URL**: In your Supabase project settings, go to Database → Connection string → URI (make sure to replace [YOUR-PASSWORD] with your actual password)

### Setting Up the Database
Before we can use Drizzle, we need to enable the vector extension in Supabase. In your Supabase SQL editor, run:
```sql
-- Enable the vector extension for similarity search
CREATE EXTENSION IF NOT EXISTS vector;

-- Create an index for fast similarity search (run this after creating the table)
CREATE INDEX ON documents USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);
```
Now generate and run our migrations:

```bash
# Generate migration files
npm run db:generate

# Push the schema to your database
npm run db:push
```
## Your Learning Journey
### Connect with OpenAI (default)

```ts
import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    messages,
  });

  return result.toDataStreamResponse();
}
```
### Connect with Ollama (for locally runnable models)
```ts
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Create Ollama instance
const ollama = createOpenAI({
  baseURL: process.env.OLLAMA_BASE_URL || "http://localhost:11434/v1",
  apiKey: "ollama",
});

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: ollama('deepseek-r1:latest'),
    messages,
  });

  return result.toDataStreamResponse();
}
```
### The key files
- [schema.ts](./src/db/schema.ts) - Define your document schemas here
- [embedding.ts](./src/lib/embedding.ts) - Change/Update your embedding model settings here
- [document.ts](./src/lib/document.ts) - Add your DB interacting functions here
- [seed.ts](./scripts/seed.ts) - Update your DB seeding code/logic here

## Getting Started (Once, your app is in a good shape to be started)

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


