import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('MONGODB_URI environment variable is not set');
  process.exit(1);
}

const SizeSchema = new mongoose.Schema({
  size: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0, required: false },
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  sizes: [SizeSchema],
  category: { type: String, default: "General" },
}, {
  timestamps: true
});

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

async function migrateProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    // Get all existing products
    const products = await Product.find({});
    console.log(`Found ${products.length} products to migrate`);

    for (const product of products) {
      // Check if product already has sizes (already migrated)
      if (product.sizes && product.sizes.length > 0) {
        console.log(`Product "${product.name}" already migrated, skipping...`);
        continue;
      }

      // Check if product has the old price field
      if (product.price) {
        // Create a default size using the old price
        const updatedProduct = {
          name: product.name,
          description: product.description,
          image: product.image,
          sizes: [{
            size: "Standard",
            price: product.price,
            quantity: 0
          }],
          category: "General"
        };

        // Update the product using findByIdAndUpdate to avoid validation issues
        await Product.findByIdAndUpdate(product._id, updatedProduct, { 
          new: true, 
          runValidators: false 
        });
        console.log(`Migrated product: "${product.name}" with price ₹${product.price} to size "Standard"`);
      }
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

migrateProducts(); 