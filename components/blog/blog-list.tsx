'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: string;
  category: string;
  tags: string[];
  image_url?: string;
  slug: string;
  status: 'published' | 'draft';
}

export function BlogList() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`/api/blog?page=${currentPage}&limit=6`);
      const data = await response.json();
      setPosts(data.posts || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200"></div>
            <CardHeader>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2"></div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow duration-300">
              {post.image_url && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.published_at).toLocaleDateString()}</span>
                  <User className="h-4 w-4 ml-4" />
                  <span>{post.author}</span>
                </div>
                <CardTitle className="line-clamp-2">{post.title}</CardTitle>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  {post.tags.slice(0, 2).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`}>
                  <Button variant="ghost" className="p-0 h-auto font-semibold text-blue-600 hover:text-blue-700">
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i + 1}
              variant={currentPage === i + 1 ? "default" : "outline"}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}