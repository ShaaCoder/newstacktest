import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Query from '@/lib/models/Query';

export async function GET() {
  try {
    await connectDB();

    const queries = await Query.find({})
      .sort({ created_at: -1 })
      .lean();

    return NextResponse.json({
      queries: queries.map(query => ({
        ...query,
        id: query._id.toString(),
        _id: undefined,
      })),
      total: queries.length,
    });
  } catch (error) {
    console.error('Admin queries API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch queries' },
      { status: 500 }
    );
  }
}