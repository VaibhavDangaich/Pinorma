require('dotenv').config({ path: '.env.local' });
const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  image: String,
});
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

const products = [
  { name: 'Floor Cleaner', description: 'Powerful floor cleaner for sparkling clean surfaces.', price: 250, image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { name: 'Handwash', description: 'Gentle and effective handwash for daily use.', price: 120, image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
  { name: 'Phenyl', description: 'Disinfectant phenyl for floors and surfaces.', price: 180, image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
  { name: 'Toilet Cleaner', description: 'Removes tough stains and kills 99.9% germs in toilets.', price: 220, image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80' },
  { name: 'Glass Cleaner', description: 'Streak-free shine for glass and mirrors.', price: 160, image: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=400&q=80' },
  { name: 'Dishwash Liquid', description: 'Tough on grease, gentle on hands.', price: 140, image: 'https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=400&q=80' },
  { name: 'Surface Sanitizer', description: 'Instantly disinfects all surfaces, safe for home & office.', price: 200, image: 'https://images.unsplash.com/photo-1588776814546-ec7e5b1c8e0c?auto=format&fit=crop&w=400&q=80' },
  { name: 'Laundry Detergent', description: 'Removes stains and keeps clothes fresh.', price: 300, image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
  { name: 'Room Freshener', description: 'Long-lasting fragrance for a pleasant environment.', price: 180, image: 'https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=400&q=80' }
];

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Sample products inserted!');
  process.exit(0);
}

seed(); 