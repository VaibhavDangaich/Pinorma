import { connectDB } from "../db";
import Product from "../models/Product";

export async function GET() {
  await connectDB();
  const products = await Product.find({});
  return Response.json(products);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const product = await Product.create(data);
  return Response.json(product);
} 