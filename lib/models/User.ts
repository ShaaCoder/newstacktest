import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  created_at: Date;
  updated_at: Date;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
}, {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);