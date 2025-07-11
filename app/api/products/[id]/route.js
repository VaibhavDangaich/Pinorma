import { NextResponse } from "next/server";
import { connectDB } from "../../db";
import Product from "../../models/Product";

export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.description || !body.image) {
      return NextResponse.json(
        { error: "Name, description, and image are required" },
        { status: 400 }
      );
    }
    
    // Validate sizes
    if (!body.sizes || !Array.isArray(body.sizes) || body.sizes.length === 0) {
      return NextResponse.json(
        { error: "At least one size is required" },
        { status: 400 }
      );
    }
    
    for (const size of body.sizes) {
      if (!size.size || !size.price || size.price <= 0) {
        return NextResponse.json(
          { error: "Each size must have a valid size name and price" },
          { status: 400 }
        );
      }
    }
    
    // Update the product
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name: body.name,
        description: body.description,
        image: body.image,
        category: body.category || "General",
        sizes: body.sizes.map(size => ({
          size: size.size,
          price: Number(size.price)
        }))
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
} 