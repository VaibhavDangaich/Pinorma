import { connectDB } from "../db";
import Product from "../models/Product";

export async function GET() {
  try {
    console.log('Testing product model...');
    await connectDB();
    
    // Test creating a simple product
    const testProduct = {
      name: "Test Product",
      description: "Test Description",
      image: "https://via.placeholder.com/150",
      category: "Test",
      sizes: [
        {
          size: "500ml",
          price: 100,
          quantity: 0
        }
      ]
    };
    
    console.log('Test product data:', testProduct);
    
    const product = await Product.create(testProduct);
    console.log('Test product created:', product._id);
    
    // Clean up - delete the test product
    await Product.findByIdAndDelete(product._id);
    console.log('Test product deleted');
    
    return Response.json({ 
      success: true, 
      message: "Product model is working correctly",
      testProduct: product
    });
  } catch (error) {
    console.error('Test failed:', error);
    return Response.json(
      { 
        success: false, 
        error: 'Test failed', 
        details: error.message,
        stack: error.stack
      },
      { status: 500 }
    );
  }
} 