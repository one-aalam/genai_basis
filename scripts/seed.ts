import { addDocument } from "@/lib/document";

export const sampleDocuments = [
  {
    title: "Getting Started with Next.js",
    content: "Next.js is a React framework that enables functionality such as server-side rendering and generating static websites. To get started, run 'npx create-next-app@latest' in your terminal. This will create a new Next.js application with all the necessary configuration files.",
    url: "https://nextjs.org/docs/getting-started"
  },
  {
    title: "Understanding React Hooks",
    content: "React Hooks are functions that let you use state and other React features in functional components. The most commonly used hooks are useState for managing component state, useEffect for side effects, and useContext for consuming context values. Hooks must be called at the top level of your component.",
    url: "https://react.dev/learn/hooks"
  },
  {
    title: "TypeScript Best Practices",
    content: "TypeScript provides static type checking for JavaScript. Some best practices include: always define types for function parameters and return values, use interfaces for object shapes, prefer type unions over any, and enable strict mode in your tsconfig.json for better type safety.",
    url: "https://typescript.org/docs"
  },
  {
    title: "Database Design Principles",
    content: "Good database design follows several principles: normalize data to reduce redundancy, use appropriate data types, create proper indexes for query performance, establish foreign key relationships, and design with scalability in mind. Always consider the queries you'll need to perform when designing your schema.",
    url: "https://example.com/database-design"
  }
];

async function seedDatabase() {
  console.log('🌱 Seeding database with sample documents...');
  
  try {
    for (const doc of sampleDocuments) {
      const added = await addDocument(doc);
      console.log(`✅ Added: ${added.title}`);
    }
    
    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

seedDatabase();