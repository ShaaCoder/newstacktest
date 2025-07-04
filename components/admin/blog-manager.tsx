'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { BlogEditor } from './blog-editor';
import { BlogPostLean } from '@/lib/types';

// Use BlogPostLean for type consistency
type BlogPost = BlogPostLean;

export function BlogManager() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/blog');
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Failed to fetch posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePost = () => {
    setEditingPost(null);
    setShowEditor(true);
  };

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post);
    setShowEditor(true);
  };

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;

    try {
      await fetch(`/api/admin/blog/${postId}`, {
        method: 'DELETE',
      });
      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Failed to delete post:', error);
    }
  };

  const handleSavePost = (post: BlogPost) => {
    if (editingPost) {
      setPosts(posts.map(p => (p.id === post.id ? post : p)));
    } else {
      setPosts([post, ...posts]);
    }
    setShowEditor(false);
    setEditingPost(null);
  };

  if (showEditor) {
    return (
      <BlogEditor
        post={editingPost}
        onSave={handleSavePost}
        onCancel={() => {
          setShowEditor(false);
          setEditingPost(null);
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Blog Posts</h2>
        <Button onClick={handleCreatePost}>
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mt-2">
                      <span>By {post.author}</span>
                      <span>
                        {post.published_at instanceof Date
                          ? post.published_at.toLocaleDateString()
                          : new Date(post.published_at).toLocaleDateString()}
                      </span>
                      <Badge variant={post.status === 'published' ? 'default' : 'secondary'}>
                        {post.status}
                      </Badge>
                      <Badge variant="outline">{post.category}</Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditPost(post)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeletePost(post.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}