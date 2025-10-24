import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a category name.'],
    unique: true,
    trim: true,
  },
  // পরিবর্তন: ক্যাটাগরির ছবির জন্য নতুন ফিল্ড যোগ করা হয়েছে
  image: {
    type: String,
    required: [true, 'Please provide an image for the category.'],
  },
}, {
  timestamps: true
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);