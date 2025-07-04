import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import Query from '@/lib/models/Query';

export async function GET() {
  try {
    await connectDB();

    // Get statistics from database
    const [totalPosts, totalQueries, pendingQueries] = await Promise.all([
      BlogPost.countDocuments({}),
      Query.countDocuments({}),
      Query.countDocuments({ status: { $in: ['new', 'in-progress'] } }),
    ]);

    const stats = {
      totalPosts,
      totalQueries,
      pendingQueries,
      monthlyViews: 15420, // This would come from analytics service
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Stats API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics' },
      { status: 500 }
    );
  }
}