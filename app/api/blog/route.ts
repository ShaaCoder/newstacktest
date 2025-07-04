import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    let query: any = { status: 'published' };

    if (search) {
      query.$text = { $search: search };
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    const skip = (page - 1) * limit;

    const posts = await BlogPost.find(query)
      .sort({ published_at: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    const totalPosts = await BlogPost.countDocuments(query);
    const totalPages = Math.ceil(totalPosts / limit);

    return NextResponse.json({
      posts: posts.map(({ _id, ...rest }) => ({
        ...rest,
        id: _id.toString(),
      })),
      pagination: {
        currentPage: page,
        totalPages,
        totalPosts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error('Blog API GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const {
      title,
      excerpt,
      content,
      author,
      published_at,
      category,
      tags,
      image_url,
      slug,
      status,
      meta_title,
      meta_description,
    } = body;

    // Validate required fields
    if (
      !title ||
      !excerpt ||
      !content ||
      !author ||
      !slug ||
      !category ||
      !['published', 'draft'].includes(status)
    ) {
      return NextResponse.json(
        { error: 'Missing or invalid required fields' },
        { status: 400 }
      );
    }

    const existingPost = await BlogPost.findOne({ slug });
    if (existingPost) {
      return NextResponse.json(
        { error: 'Slug already exists' },
        { status: 409 }
      );
    }

    const newPost = await BlogPost.create({
      title,
      excerpt,
      content,
      author,
      published_at: published_at || new Date(),
      category,
      tags,
      image_url,
      slug,
      status,
      meta_title,
      meta_description,
    });

    return NextResponse.json({
      message: 'Post created successfully',
      post: {
        ...newPost.toObject(),
        id: newPost._id.toString(),
        _id: undefined,
      },
    });
  } catch (error) {
    console.error('Blog API POST error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}
