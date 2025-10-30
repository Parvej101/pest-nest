import mongoose from 'mongoose';

const CouponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    uppercase: true, // সব কোডকে স্বয়ংক্রিয়ভাবে বড় হাতের অক্ষরে সেভ করবে
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'], // ডিসকাউন্ট কি পার্সেন্টেজ নাকি নির্দিষ্ট পরিমাণ
    required: true,
  },
  discountValue: {
    type: Number,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });

export default mongoose.models.Coupon || mongoose.model('Coupon', CouponSchema);