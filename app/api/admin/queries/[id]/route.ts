import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Query from '@/lib/models/Query';
import { QueryLean } from '@/lib/types';           // ✅

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const updates = await request.json();
    const { id } = params;

    const updatedQuery = await Query.findByIdAndUpdate(
      id,
      updates,
      { new: true, runValidators: true }
    )
      .lean<QueryLean>()                           // ✅ type‑safe lean
      .exec();

    if (!updatedQuery) {
      return NextResponse.json(
        { error: 'Query not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...updatedQuery,
      id: updatedQuery._id.toString(),
      _id: undefined,
    });
  } catch (err) {
    console.error('Update query error:', err);
    return NextResponse.json(
      { error: 'Failed to update query' },
      { status: 500 }
    );
  }
}
