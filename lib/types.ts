import { IBlogPost } from '@/lib/models/BlogPost';
import { Types } from 'mongoose';
import { IQuery } from '@/lib/models/Query';

// Define BlogPostLean to match the lean document structure
export type BlogPostLean = {
  _id: Types.ObjectId | string;
  id: string; // Required
  title: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: Date | string;
  category: string;
  tags: string[];
  image_url?: string;
  slug: string;
  status: 'published' | 'draft';
  meta_title?: string;
  meta_description?: string;
  created_at: Date | string;
  updated_at: Date | string;
};

// Optionally, if you want to keep using Omit for DRYness
export type BlogPostLeanOmit = Omit<IBlogPost, keyof Document> & {
  _id: Types.ObjectId | string;
  id: string;
};

export type QueryLean = Omit<IQuery, keyof Document> & {
  _id: Types.ObjectId;
};