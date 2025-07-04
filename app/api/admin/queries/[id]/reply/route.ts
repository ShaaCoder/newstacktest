import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Query from '@/lib/models/Query';
import { QueryLean } from '@/lib/types';           // ✅

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { message } = await request.json();
    const { id } = params;

    const updatedQuery = await Query.findByIdAndUpdate(
      id,
      {
        status: 'resolved',
        replied_at: new Date(),
        reply_message: message,
      },
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

    /** TODO: send email here */

    return NextResponse.json({
      ...updatedQuery,
      id: updatedQuery._id.toString(),
      _id: undefined,
    });
  } catch (err) {
    console.error('Reply to query error:', err);
    return NextResponse.json(
      { error: 'Failed to send reply' },
      { status: 500 }
    );
  }
}
