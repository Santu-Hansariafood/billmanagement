import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Bill from "@/models/Bill";
import { getToken } from "next-auth/jwt";

export const runtime = "nodejs";

// -------------------------------
// GET BILL BY ID
// -------------------------------
export async function GET(req, context) {
  const params = await context.params; // ✅ FIX
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const doc = await Bill.findById(params.id);

  if (!doc) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const o = doc.toObject();
  o.id = doc._id.toString();
  delete o._id;
  delete o.__v;

  return NextResponse.json(o);
}

// -------------------------------
// UPDATE BILL (PATCH)
// -------------------------------
export async function PATCH(req, context) {
  const params = await context.params; // ✅ FIX
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  await dbConnect();

  const doc = await Bill.findByIdAndUpdate(
    params.id,
    { $set: body },
    { new: true }
  );

  if (!doc) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const o = doc.toObject();
  o.id = doc._id.toString();
  delete o._id;
  delete o.__v;

  return NextResponse.json(o);
}

// -------------------------------
// DELETE BILL
// -------------------------------
export async function DELETE(req, context) {
  const params = await context.params; // ✅ FIX
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const result = await Bill.findByIdAndDelete(params.id);

  if (!result) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ ok: true });
}
