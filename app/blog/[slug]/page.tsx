// app/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import connectDB from '@/lib/mongodb';
import BlogPost from '@/lib/models/BlogPost';
import { BlogPostLean } from '@/lib/types';

type Props = { params: { slug: string } };

/* ─────────────  <head> metadata  ───────────── */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await connectDB();

  const post = await BlogPost.findOne({
    slug: params.slug,
    status: 'published',
  })
    .lean<BlogPostLean>()         // ✅ proper generic
    .exec() as BlogPostLean | null;

  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
  };
}

/* ─────────────  Page component  ───────────── */
export default async function BlogDetailPage({ params }: Props) {
  await connectDB();

  const post = await BlogPost.findOne({
    slug: params.slug,
    status: 'published',
  })
    .lean<BlogPostLean>()
    .exec() as BlogPostLean | null;

  if (!post) return notFound();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-16">
        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-96 object-cover rounded-xl mb-8"
          />
        )}
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 text-sm mb-6">
          Published on {new Date(post.published_at).toLocaleDateString()} by {post.author}
        </p>
        <div
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>
      <Footer />
    </div>
  );
}
