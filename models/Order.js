import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  // যে ইউজার অর্ডার করেছে (যদি লগইন করা থাকে)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
  // কাস্টমারের তথ্য
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  customerEmail: { type: String }, // ঐচ্ছিক
  
  // ডেলিভারি ঠিকানা
  shippingAddress: { type: String, required: true },
  shippingArea: { type: String, enum: ['inside_dhaka', 'outside_dhaka'], required: true },
  
  // অর্ডারের আইটেমগুলো
  orderItems: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number,
    quantity: Number,
    image: String,
  }],
  
  // অর্ডারের মোট হিসাব
  subTotal: { type: Number, required: true },
  shippingCharge: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  grandTotal: { type: Number, required: true },
  
  // অর্ডারের স্ট্যাটাস
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_progress', 'completed', 'canceled'],
    default: 'pending',
  },
  
  paymentMethod: { type: String, default: 'Cash on Delivery' },
  paymentStatus: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },

}, { timestamps: true });

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);