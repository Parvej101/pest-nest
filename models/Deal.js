import mongoose from 'mongoose';

const DealSchema = new mongoose.Schema({
  // আমরা সিস্টেমে একটি মাত্র ডিল রাখব, তাই একটি ইউনিক 'key' ব্যবহার করছি
  key: {
    type: String,
    default: 'active-deal',
    unique: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a title for the deal (e.g., Monsoon Sale).'],
    trim: true,
  },
  // ডিলটি কখন শেষ হবে তার তারিখ
  expiryDate: {
    type: Date,
    required: [true, 'Please provide an expiry date for the deal.'],
  },
  // এই ডিলের অন্তর্ভুক্ত প্রোডাক্টগুলোর আইডি
  productIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // 'Product' মডেলের সাথে সম্পর্ক স্থাপন
  }],
}, { timestamps: true });

export default mongoose.models.Deal || mongoose.model('Deal', DealSchema);