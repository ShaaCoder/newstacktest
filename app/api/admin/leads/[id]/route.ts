import { NextRequest } from 'next/server'
import connectDB from '@/lib/mongodb'
import { Lead } from '@/lib/models/Lead'

// DELETE /api/admin/leads/[id]
export async function DELETE(_: NextRequest, { params }: { params: { id: string } }) {
  await connectDB()
  try {
    await Lead.findByIdAndDelete(params.id)
    return new Response(JSON.stringify({ success: true }), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete lead' }), { status: 500 })
  }
}

// PATCH /api/admin/leads/[id]
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB()
  const body = await request.json()

  try {
    const updated = await Lead.findByIdAndUpdate(params.id, body, { new: true })
    return new Response(JSON.stringify(updated), { status: 200 })
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update lead' }), { status: 500 })
  }
}
