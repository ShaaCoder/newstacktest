// lib/types.ts (or anywhere you define types)
import { IBlogPost } from '@/lib/models/BlogPost';
import { Types } from 'mongoose';

export type BlogPostLean = Omit<IBlogPost, keyof Document> & {
  _id: Types.ObjectId;
};
