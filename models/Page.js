import mongoose from 'mongoose';

const PageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true, // যেমন: 'privacy-policy', 'terms'
  },
  // এখানে আমরা Rich Text Editor থেকে আসা HTML কন্টেন্ট সেভ করব
  content: {
    type: String, 
    default: '',
  },
}, { timestamps: true });

export default mongoose.models.Page || mongoose.model('Page', PageSchema);