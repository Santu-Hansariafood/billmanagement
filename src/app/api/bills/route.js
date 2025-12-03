import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Bill from "@/models/Bill";
import { getToken } from "next-auth/jwt";

export const runtime = "nodejs";

export async function GET(req) {
  const token = await getToken({ req });
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbConnect();
  const docs = await Bill.find({ userId: token.id }).sort({ createdAt: -1 });
  const data = docs.map((d) => {
    const o = d.toObject();
    o.id = d._id.toString();
    delete o._id;
    delete o.__v;
    return o;
  });
  return NextResponse.json(data);
}

export async function POST(req) {
  const token = await getToken({ req });
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  await dbConnect();
  const doc = await Bill.create({ ...body, userId: token.id });
  const o = doc.toObject();
  o.id = doc._id.toString();
  delete o._id;
  delete o.__v;
  return NextResponse.json(o, { status: 201 });
}
