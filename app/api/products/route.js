import { connectDB } from "../db";
import Product from "../models/Product";

export async function GET() {
  await connectDB();
  const products = await Product.find({});
  return Response.json(products);
}

export async function POST(req) {
  try {
    console.log('Starting product creation...');
    await connectDB();
    const data = await req.json();
    console.log('Received data:', JSON.stringify(data, null, 2));
    
    // Ensure each size has a quantity field (default to 0 if not provided)
    if (data.sizes && Array.isArray(data.sizes)) {
      data.sizes = data.sizes.map(size => ({
        ...size,
        quantity: size.quantity || 0
      }));
    }
    
    console.log('Processed data:', JSON.stringify(data, null, 2));
    
    const product = await Product.create(data);
    console.log('Product created successfully:', product._id);
    return Response.json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    console.error('Error details:', error.message);
    console.error('Error stack:', error.stack);
    return Response.json(
      { error: 'Failed to create product', details: error.message },
      { status: 400 }
    );
  }
} 