import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Query from '@/lib/models/Query';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const body = await request.json();
    const { id } = params;
    const { message } = body;

    const updatedQuery = await Query.findByIdAndUpdate(
      id,
      {
        status: 'resolved',
        replied_at: new Date(),
        reply_message: message,
      },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedQuery) {
      return NextResponse.json(
        { error: 'Query not found' },
        { status: 404 }
      );
    }

    // Here you would typically send an email notification
    // For now, we'll just return success

    return NextResponse.json({
      ...updatedQuery,
      id: updatedQuery._id.toString(),
      _id: undefined,
    });
  } catch (error) {
    console.error('Reply to query error:', error);
    return NextResponse.json(
      { error: 'Failed to send reply' },
      { status: 500 }
    );
  }
}