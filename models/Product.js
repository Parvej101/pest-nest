import mongoose from 'mongoose';

// --- ভ্যারিয়েন্ট সাব-স্কিমা (আপডেট করা) ---
// এটি এখন আরও ফ্লেক্সিবল (size-এর বদলে value ব্যবহার করা হয়েছে) এবং এতে stock আছে
const VariantSchema = new mongoose.Schema({
  value: { 
    type: String, 
    required: [true, 'Please provide a value (e.g., Red, XL, 1KG) for this variant.'] 
  },
  price: { 
    type: Number, 
    required: [true, 'Please provide a price for this variant.'] 
  },
  stock: { 
    type: Number, 
    default: 0 // ডিফল্ট স্টক ০
  },
  image: { 
    type: String // ভ্যারিয়েন্টের নিজস্ব ছবি (ঐচ্ছিক)
  }
});

// --- গ্যালারি ইমেজের সাব-স্কিমা (অপরিবর্তিত) ---
const GalleryImageSchema = new mongoose.Schema({
  id: { type: String },
  src: { type: String, required: true },
  alt: { type: String },
});


// --- মূল প্রোডাক্ট স্কিমা (আপডেট করা) ---
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: [true, 'Please provide a product name.'], trim: true },
  slug: { type: String, required: [true, 'Please provide a unique slug.'], unique: true },
  imageSrc: { type: String, required: [true, 'Please provide a thumbnail image source.'] },
  galleryImages: [GalleryImageSchema],
  description: { type: String, required: [true, 'Please provide a product description.'] },
  category: { type: String, required: [true, 'Please provide a product category.'] },
  
  // --- নতুন ফিল্ড ---
  type: {
    type: String,
    enum: ['single', 'variation'],
    default: 'single',
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
  
  // 'single' টাইপ প্রোডাক্টের জন্য
  price: { type: Number },
  oldPrice: { type: Number },
  stock: { type: Number, default: 0 }, // নতুন স্টক ফিল্ড
  
  // 'variation' টাইপ প্রোডাক্টের জন্য
  variationType: { type: String }, // যেমন: "Color", "Size", "KG"
  variants: [VariantSchema], 
  
  // অন্যান্য
  productCode: { type: String },
  unitType: { type: String, default: 'Piece' },
  isFeatured: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
}, {
  timestamps: true 
});

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);