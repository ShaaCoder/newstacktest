import mongoose, { Document, Schema } from 'mongoose';

export interface IQuery extends Document {
  name: string;
  email: string;
  company?: string;
  message: string;
  status: 'new' | 'in-progress' | 'resolved' | 'archived';
  created_at: Date;
  replied_at?: Date;
  reply_message?: string;
}

const QuerySchema = new Schema<IQuery>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  company: {
    type: String,
    trim: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['new', 'in-progress', 'resolved', 'archived'],
    default: 'new',
  },
  replied_at: {
    type: Date,
  },
  reply_message: {
    type: String,
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

export default mongoose.models.Query || mongoose.model<IQuery>('Query', QuerySchema);