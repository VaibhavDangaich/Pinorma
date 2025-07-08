import { connectDB } from "../../db";
import Product from "../../models/Product";

export async function DELETE(req, { params }) {
  await connectDB();
  const { id } = params;
  await Product.findByIdAndDelete(id);
  return Response.json({ success: true });
} 