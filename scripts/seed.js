// পরিবর্তন: 'require'-এর বদলে এখন 'import' ব্যবহার করা হচ্ছে
import { allProducts } from '../src/data/products.js';

const API_URL = 'http://localhost:3000/api/products';

async function seedDatabase() {
  console.log('🌱 Starting to seed the database...');

  for (const productData of allProducts) {
    try {
      console.log(`  - Seeding product: ${productData.name}...`);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      const result = await response.json();

      if (response.status !== 201) {
        console.error(`  ❌ Failed to seed product: ${productData.name}`);
        console.error(`     Error: ${result.error || 'Unknown error'}`);
      } else {
        console.log(`  ✅ Successfully seeded product: ${productData.name}`);
      }
    } catch (error) {
      console.error(`  ❌ An unexpected error occurred for product: ${productData.name}`);
      console.error(error);
    }
  }

  console.log('🌲 Finished seeding the database!');
}

seedDatabase();