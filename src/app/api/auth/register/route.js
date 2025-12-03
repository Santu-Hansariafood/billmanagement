import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
export const runtime = 'nodejs'

export async function POST(req) {
  const { mobile, password } = await req.json()
  if (!mobile || !password) {
    return NextResponse.json({ error: 'Missing mobile or password' }, { status: 400 })
  }
  await dbConnect()
  const exists = await User.findOne({ mobile })
  if (exists) {
    return NextResponse.json({ error: 'Mobile already exists' }, { status: 409 })
  }
  const user = await User.create({ mobile, password })
  return NextResponse.json({ ok: true, user: { id: user._id.toString(), mobile: user.mobile } }, { status: 201 })
}
