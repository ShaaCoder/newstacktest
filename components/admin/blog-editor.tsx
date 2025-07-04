'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Eye } from 'lucide-react';
import { toast } from 'sonner';
import { BlogPostLean } from '@/lib/types';

// Use BlogPostLean for type consistency
type BlogPost = BlogPostLean;

interface BlogEditorProps {
  post: BlogPost | null;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}

export function BlogEditor({ post, onSave, onCancel }: BlogEditorProps) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    category: post?.category || '',
    tags: post?.tags?.join(', ') || '',
    image_url: post?.image_url || '',
    status: post?.status || 'draft',
    meta_title: post?.meta_title || '',
    meta_description: post?.meta_description || '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const postData: BlogPost = {
        id: post?.id || new Date().toISOString(), // Fallback ID for new posts
        _id: post?._id || '',
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        author: 'Admin', // Should come from authenticated user
        published_at: post?.published_at || new Date(),
        category: formData.category,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        image_url: formData.image_url,
        slug,
        status: formData.status,
        meta_title: formData.meta_title,
        meta_description: formData.meta_description,
        created_at: post?.created_at || new Date(),
        updated_at: new Date(),
      };

      const url = post ? `/api/admin/blog/${post.id}` : '/api/admin/blog';
      const method = post ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...postData,
          id: undefined, // Exclude id from payload, API handles it
          published_at: postData.published_at instanceof Date
            ? postData.published_at.toISOString()
            : postData.published_at,
          created_at: postData.created_at instanceof Date
            ? postData.created_at.toISOString()
            : postData.created_at,
          updated_at: postData.updated_at instanceof Date
            ? postData.updated_at.toISOString()
            : postData.updated_at,
        }),
      });

      if (response.ok) {
        const savedPost = await response.json();
        onSave({
          ...savedPost.post,
          id: savedPost.post.id,
          published_at: new Date(savedPost.post.published_at),
          created_at: new Date(savedPost.post.created_at),
          updated_at: new Date(savedPost.post.updated_at),
        });
        toast.success(post ? 'Post updated successfully!' : 'Post created successfully!');
      } else {
        toast.error('Failed to save post. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onCancel}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h2 className="text-2xl font-bold text-gray-900">
            {post ? 'Edit Post' : 'Create New Post'}
          </h2>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            <Save className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="excerpt">Excerpt *</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => handleChange('excerpt', e.target.value)}
                  required
                  rows={3}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  required
                  rows={15}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta_title">Meta Title</Label>
                <Input
                  id="meta_title"
                  value={formData.meta_title}
                  onChange={(e) => handleChange('meta_title', e.target.value)}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="meta_description">Meta Description</Label>
                <Textarea
                  id="meta_description"
                  value={formData.meta_description}
                  onChange={(e) => handleChange('meta_description', e.target.value)}
                  rows={3}
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publish Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="status">Published</Label>
                <Switch
                  id="status"
                  checked={formData.status === 'published'}
                  onCheckedChange={(checked) =>
                    handleChange('status', checked ? 'published' : 'draft')
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Post Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleChange('category', value)}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web-development">Web Development</SelectItem>
                    <SelectItem value="mobile-development">Mobile Development</SelectItem>
                    <SelectItem value="ui-ux-design">UI/UX Design</SelectItem>
                    <SelectItem value="seo-marketing">SEO & Marketing</SelectItem>
                    <SelectItem value="tutorials">Tutorials</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="tags">Tags (comma-separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => handleChange('tags', e.target.value)}
                  placeholder="react, javascript, tutorial"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="image_url">Featured Image URL</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => handleChange('image_url', e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="mt-1"
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  );
}