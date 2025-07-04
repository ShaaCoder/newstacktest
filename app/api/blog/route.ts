import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { BlogPostLean } from '@/lib/types';

export const dynamic = 'force-dynamic';

/* ─────────────  GET  /api/blog  ───────────── */
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    const query: any = { status: 'published' };
    if (search) query.$text = { $search: search };
    if (category && category !== 'all') query.category = category;

    const skip = (page - 1) * limit;

    const posts = await BlogPost.find(query)
      .sort({ published_at: -1 })
      .skip(skip)
      .limit(limit)
      .lean<BlogPostLean[]>();

    const totalPosts = await BlogPost.countDocuments(query);
    const totalPages = Math.ceil(totalPosts / limit);

    return NextResponse.json({
      posts: posts.map(({ _id, ...rest }) => ({
        ...rest,
        id: _id.toString(),
        published_at: rest.published_at instanceof Date
          ? rest.published_at.toISOString()
          : rest.published_at,
        created_at: rest.created_at instanceof Date
          ? rest.created_at.toISOString()
          : rest.created_at,
        updated_at: rest.updated_at instanceof Date
          ? rest.updated_at.toISOString()
          : rest.updated_at,
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
      { status: 500 },
    );
  }
}

/* ─────────────  POST  /api/blog  ───────────── */
export async function POST(req: NextRequest) {
  try {
    await connectDB();
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

    /* basic validation */
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
        { status: 400 },
      );
    }

    if (await BlogPost.findOne({ slug })) {
      return NextResponse.json({ error: 'Slug already exists' }, { status: 409 });
    }

    const newPost = await BlogPost.create({
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
    });

    return NextResponse.json(
      {
        message: 'Post created successfully',
        post: {
          ...newPost.toObject(),
          id: newPost._id.toString(),
          _id: undefined,
          published_at: newPost.published_at.toISOString(),
          created_at: newPost.created_at.toISOString(),
          updated_at: newPost.updated_at.toISOString(),
        },
      },
      { status: 201 },
    );
  } catch (err) {
    console.error('Blog API POST error:', err);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 },
    );
  }
}