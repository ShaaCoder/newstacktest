import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { BlogPostLean } from '@/lib/types';

export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const id = req.url.split('/').pop();
    const body = await req.json();

    const {
      title,
      excerpt,
      content,
      author,
      category,
      slug,
      status,
      published_at,
      tags,
      image_url,
      meta_title,
      meta_description,
    } = body;

    // Basic validation
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

    const existingPost = await BlogPost.findOne({ slug, _id: { $ne: id } });
    if (existingPost) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }

    const updatedPost = await BlogPost.findByIdAndUpdate(
      id,
      {
        title,
        excerpt,
        content,
        author,
        category,
        slug,
        status,
        published_at: published_at ? new Date(published_at) : new Date(),
        tags,
        image_url,
        meta_title,
        meta_description,
        updated_at: new Date(),
      },
      { new: true }
    ).lean<BlogPostLean>();

    if (!updatedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'Post updated successfully',
      post: {
        ...updatedPost,
        id: updatedPost._id.toString(),
        _id: undefined,
        published_at: updatedPost.published_at instanceof Date
          ? updatedPost.published_at.toISOString()
          : new Date(updatedPost.published_at).toISOString(),
        created_at: updatedPost.created_at instanceof Date
          ? updatedPost.created_at.toISOString()
          : new Date(updatedPost.created_at).toISOString(),
        updated_at: updatedPost.updated_at instanceof Date
          ? updatedPost.updated_at.toISOString()
          : new Date(updatedPost.updated_at).toISOString(),
      },
    });
  } catch (err) {
    console.error('Admin Blog API PUT error:', err);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

/* ─────────────  DELETE /api/admin/blog/:id ───────────── */
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const id = req.url.split('/').pop();

    const deletedPost = await BlogPost.findByIdAndDelete(id);

    if (!deletedPost) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Post deleted successfully' });
  } catch (err) {
    console.error('Admin Blog API DELETE error:', err);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}
