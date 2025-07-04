// lib/types.ts (or anywhere you define types)
import { IBlogPost } from '@/lib/models/BlogPost';
import { Types } from 'mongoose';
import { IQuery } from '@/lib/models/Query';
// lib/types.ts


// Define BlogPostLean to match the lean document structure
export type BlogPostLean = {
  _id: Types.ObjectId | string; // Allow string for compatibility with JSON responses
  title: string;
  excerpt: string;
  content: string;
  author: string;
  published_at: Date;
  category: string;
  tags: string[];
  image_url?: string;
  slug: string;
  status: 'published' | 'draft';
  meta_title?: string;
  meta_description?: string;
  created_at: Date;
  updated_at: Date;
};

// Optionally, if you want to keep using Omit for DRYness, ensure it only removes Document-specific methods
export type BlogPostLeanOmit = Omit<IBlogPost, keyof Document> & {
  _id: Types.ObjectId | string;
};

export type QueryLean = Omit<IQuery, keyof Document> & {
  _id: Types.ObjectId;
};