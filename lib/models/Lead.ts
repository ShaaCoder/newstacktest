// /lib/models/Lead.ts
import mongoose from 'mongoose'

const LeadSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone_number: String,
  website: String,
  query: String,
  location: String,
  status: {
    type: String,
    enum: ['New', 'Contacted', 'Converted', 'Closed'],
    default: 'New',
  },
}, { timestamps: true })

// ✅ Prevent duplicate leads by name + address
LeadSchema.index({ name: 1, address: 1 }, { unique: true })

export const Lead = mongoose.models.Lead || mongoose.model('Lead', LeadSchema)
