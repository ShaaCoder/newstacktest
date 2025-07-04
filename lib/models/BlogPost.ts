import mongoose, { Document, Schema } from 'mongoose';

export interface IBlogPost extends Document {
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
}

const BlogPostSchema = new Schema<IBlogPost>({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  excerpt: {
    type: String,
    required: true,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  published_at: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
    enum: ['web-development', 'mobile-development', 'ui-ux-design', 'seo-marketing', 'tutorials'],
  },
  tags: [{
    type: String,
    trim: true,
  }],
  image_url: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  status: {
    type: String,
    enum: ['published', 'draft'],
    default: 'draft',
  },
  meta_title: {
    type: String,
    trim: true,
  },
  meta_description: {
    type: String,
    trim: true,
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

// Create index for search functionality
BlogPostSchema.index({ title: 'text', excerpt: 'text', content: 'text', tags: 'text' });

export default mongoose.models.BlogPost || mongoose.model<IBlogPost>('BlogPost', BlogPostSchema);