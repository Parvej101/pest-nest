import mongoose from 'mongoose';

const SliderSchema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, 'Please provide an image for the slide.'],
  },
  link: {
    type: String,
    trim: true,
    default: '/', // যদি কোনো লিঙ্ক না দেওয়া হয়, তাহলে হোমপেজে যাবে
  },
}, { timestamps: true });

export default mongoose.models.Slider || mongoose.model('Slider', SliderSchema);