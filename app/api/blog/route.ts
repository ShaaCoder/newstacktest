import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { BlogPostLean } from '@/lib/types';  // ✅ import the lean type

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page     = parseInt(searchParams.get('page')     || '1');
    const limit    = parseInt(searchParams.get('limit')    || '10');
    const search   =          searchParams.get('search')   || '';
    const category =          searchParams.get('category') || '';

    const query: any = { status: 'published' };

    /* —– build $text + category filters —– */
    if (search)              query.$text    = { $search: search };
    if (category && category !== 'all') query.category = category;

    const skip = (page - 1) * limit;

    /* —– critical line: lean<BlogPostLean[]>() —– */
    const posts = await BlogPost.find(query)
      .sort({ published_at: -1 })
      .skip(skip)
      .limit(limit)
      .lean<BlogPostLean[]>();        // ✅ _id is now Types.ObjectId

    const totalPosts  = await BlogPost.countDocuments(query);
    const totalPages  = Math.ceil(totalPosts / limit);

    return NextResponse.json({
      posts: posts.map(({ _id, ...rest }) => ({
        ...rest,
        id: _id.toString(),           // ✅ no TS error now
      })),
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (err) {
    console.error('Blog API GET error:', err);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}
