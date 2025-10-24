import mongoose from 'mongoose';

const VariationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a variation name (e.g., Color, Size).'],
    unique: true,
    trim: true,
  },
}, {
  timestamps: true
});

export default mongoose.models.Variation || mongoose.model('Variation', VariationSchema);