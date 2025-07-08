import { connectDB } from "../db";
import Enquiry from "../models/Enquiry";

export async function GET() {
  await connectDB();
  const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
  return Response.json(enquiries);
}

export async function POST(req) {
  await connectDB();
  const data = await req.json();
  const enquiry = await Enquiry.create(data);
  return Response.json(enquiry);
} 