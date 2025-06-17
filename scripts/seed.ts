import { addDocument } from "@/lib/document";



async function seedDatabase() {
  console.log('🌱 Seeding database with sample documents...');
  
  try {
    // @TODO: loop over your documents, to generate embeddings and add to the DB
    // for (const doc of sampleDocuments) {
    //   const added = await addDocument(doc);
    //   console.log(`✅ Added: ${added.title}`);
    // }
    
    console.log('🎉 Database seeded successfully!');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
  }
}

seedDatabase();