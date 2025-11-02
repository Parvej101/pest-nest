import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  addressLine1: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  phone: { type: String, required: true },
  isDefault: { type: Boolean, default: false },
});

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  image: String,
  emailVerified: Date,
  // পরিবর্তন: role ফিল্ডটি যোগ করা হয়েছে
  role: {
    type: String,
    enum: ["user", "staff", "admin"],
    default: "user", // নতুন সব ইউজার ডিফল্টভাবে 'user' হবে
  },
  addresses: [AddressSchema],
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
