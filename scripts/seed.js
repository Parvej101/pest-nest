
import { allProducts } from '../src/data/products.js';

const API_URL = 'http://localhost:3000/api/products';

async function seedDatabase() {
  console.log('🌱 Starting to seed the database...');

  // প্রথমে সব পুরনো প্রোডাক্ট ডিলিট করার চেষ্টা করা হচ্ছে
  try {
    console.log('  - Deleting all existing products...');
    const deleteRes = await fetch(API_URL, { method: 'DELETE' });
    
    if (!deleteRes.ok) {
      const errorData = await deleteRes.json();
      throw new Error(errorData.error || "Failed to delete products");
    }
    
    console.log('  ✅ Successfully deleted old products.');
  } catch (e) {
    console.warn(`  ⚠️ Could not delete old products: ${e.message}. Seeding will continue over existing data.`);
  }

  console.log('\n  - Starting to add new products...');
  for (const product of allProducts) {
    const productData = {
      ...product,
      galleryImages: product.galleryImages || [],
    };
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      const result = await response.json();
      if (response.status !== 201) {
        console.error(`  ❌ Failed to seed product: ${productData.name} (Slug: ${productData.slug})`);
        console.error(`     Error: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error(`  ❌ An unexpected error occurred for product: ${productData.name}`);
      console.error(error);
    }
  }

  console.log('\n🌲 Finished seeding the database!');
}

seedDatabase();