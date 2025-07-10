import mongoose from "mongoose";

const SizeSchema = new mongoose.Schema({
  size: { type: String, required: true }, // e.g., "500ml", "1L", "2L"
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0, required: false }, // optional stock quantity
});

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  sizes: [SizeSchema], // array of sizes with prices
  category: { type: String, default: "General" }, // optional category
}, {
  timestamps: true
});

// Always overwrite the model to avoid schema caching issues
export default mongoose.models.Product
  ? (delete mongoose.models.Product, mongoose.model("Product", ProductSchema))
  : mongoose.model("Product", ProductSchema); 