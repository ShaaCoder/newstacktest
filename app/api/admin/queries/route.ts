import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Query from '@/lib/models/Query';
import { QueryLean } from '@/lib/types'; // ✅ import lean type

export async function GET() {
  try {
    await connectDB();

    const queries = await Query.find({})
      .sort({ created_at: -1 })
      .lean<QueryLean[]>(); // ✅ properly typed lean array

    return NextResponse.json({
      queries: queries.map((query) => ({
        ...query,
        id: query._id.toString(), // ✅ _id now typed as ObjectId
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
