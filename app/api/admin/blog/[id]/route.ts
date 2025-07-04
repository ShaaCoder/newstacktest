import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { BlogPostLean } from '@/lib/types';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const body = await request.json();
    const { id } = params;

    if (body.title) {
      body.slug = body.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    })
      .lean<BlogPostLean>() // ✅ now we manually provide the correct lean type
      .exec();

    if (!updatedPost) {
      return NextResponse.json(
        { error: 'Blog post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      ...updatedPost,
      id: updatedPost._id.toString(),
      _id: undefined,
    });
  } catch (err) {
    console.error('Update post error:', err);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}
