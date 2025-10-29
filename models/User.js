import mongoose from 'mongoose';

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
    enum: ['user', 'staff', 'admin'],
    default: 'user', // নতুন সব ইউজার ডিফল্টভাবে 'user' হবে
  },
});

export default mongoose.models.User || mongoose.model('User', UserSchema);