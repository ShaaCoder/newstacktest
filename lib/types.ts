// lib/types.ts (or anywhere you define types)
import { IBlogPost } from '@/lib/models/BlogPost';
import { Types } from 'mongoose';
import { IQuery } from '@/lib/models/Query';
export type BlogPostLean = Omit<IBlogPost, keyof Document> & {
  _id: Types.ObjectId;
};

export type QueryLean = Omit<IQuery, keyof Document> & {
  _id: Types.ObjectId;
};