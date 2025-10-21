import mongoose from 'mongoose';

// --- ভ্যারিয়েন্টের জন্য একটি ছোট সাব-স্কিমা ---
// এটি মূল স্কিমার ভেতরে ব্যবহার করা হবে
const VariantSchema = new mongoose.Schema({
  sku: {
    type: String,
  },
  size: {
    type: String,
    required: [true, 'Please provide a size for this variant.'],
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price for this variant.'],
  },
});

// --- গ্যালারি ইমেজের জন্য একটি ছোট সাব-স্কিমা ---
const GalleryImageSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  src: {
    type: String,
    required: [true, 'Please provide an image source.'],
  },
  alt: {
    type: String,
  },
});


// --- মূল প্রোডাক্ট স্কিমা ---
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a product name.'],
    trim: true, // নামের আগে-পরে থাকা অপ্রয়োজনীয় স্পেস মুছে দেবে
  },
  slug: {
    type: String,
    required: [true, 'Please provide a unique slug.'],
    unique: true, // নিশ্চিত করে যে প্রতিটি প্রোডাক্টের slug আলাদা হবে
  },
  imageSrc: {
    type: String,
    required: [true, 'Please provide a thumbnail image source.'],
  },
  galleryImages: [GalleryImageSchema], // এখানে আমরা ওপরের সাব-স্কিমাটি ব্যবহার করছি
  
  // যে প্রোডাক্টের ভ্যারিয়েশন নেই, তার জন্য এই দুটি ফিল্ড
  price: {
    type: Number,
  },
  oldPrice: {
    type: Number,
  },

  // যে প্রোডাক্টের ভ্যারিয়েশন আছে, তার জন্য এই ফিল্ড
  variants: [VariantSchema], // এখানেও সাব-স্কিমা ব্যবহার করা হচ্ছে

  description: {
    type: String,
    required: [true, 'Please provide a product description.'],
  },
  category: {
    type: String,
    required: [true, 'Please provide a product category.'],
  },
  isFeatured: {
    type: Boolean,
    default: false, // যদি কোনো মান না দেওয়া হয়, তাহলে ডিফল্টভাবে false সেট হবে
  },
  isTrending: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true // এই অপশনটি স্বয়ংক্রিয়ভাবে createdAt এবং updatedAt নামে দুটি ফিল্ড যোগ করে দেবে
});

// এই লাইনটি একটি অপটিমাইজেশন। এটি চেক করে যে 'Product' মডেলটি আগে থেকেই তৈরি করা আছে কিনা।
// যদি থাকে, তাহলে সেটি ব্যবহার করে। যদি না থাকে, তাহলে নতুন করে তৈরি করে।
export default mongoose.models.Product || mongoose.model('Product', ProductSchema);