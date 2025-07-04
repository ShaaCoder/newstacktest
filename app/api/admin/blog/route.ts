import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';

export async function GET() {
  try {
    await connectDB();

    const posts = await BlogPost.find({})
      .sort({ created_at: -1 })
      .lean();

    return NextResponse.json({
      posts: posts.map(post => ({
        ...post,
        id: post._id.toString(),
        _id: undefined,
      })),
      total: posts.length,
    });
  } catch (error) {
    console.error('Admin blog API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    
    // Generate slug from title
    const slug = body.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const newPost = new BlogPost({
      ...body,
      slug,
      published_at: new Date(),
    });

    const savedPost = await newPost.save();

    return NextResponse.json({
      ...savedPost.toObject(),
      id: savedPost._id.toString(),
      _id: undefined,
    }, { status: 201 });
  } catch (error) {
    console.error('Create post error:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}