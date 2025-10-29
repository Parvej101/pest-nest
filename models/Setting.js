import mongoose from 'mongoose';

const SettingSchema = new mongoose.Schema({
  // আমরা একটি মাত্র ডকুমেন্ট রাখব, তাই একটি ইউনিক 'key' ব্যবহার করছি
  key: {
    type: String,
    default: 'site-settings',
    unique: true,
  },
  // Contact Information
  contactPhone: { type: String, trim: true },
  contactEmail: { type: String, trim: true },
  contactAddress: { type: String, trim: true },
   contactWhatsapp: { type: String, trim: true },

  // Announcement
  announcementText: { type: String, trim: true },

  // Map
  mapLink: { type: String, trim: true },
  mapImageSrc: { type: String },

   footerTagline: { type: String, trim: true },
  socialFacebook: { type: String, trim: true },
  socialInstagram: { type: String, trim: true },
  socialYoutube: { type: String, trim: true },
  socialTiktok: { type: String, trim: true },
  paymentMethodsImageSrc: { type: String },

   videoShowcaseId: { 
    type: String, 
    trim: true,
    default: 'KId3r5dVwGk', // একটি ডিফল্ট ID
  },
  videoShowcaseLink: { 
    type: String, 
    trim: true,
    default: '/shop', // একটি ডিফল্ট লিঙ্ক
  },


}, { timestamps: true });

export default mongoose.models.Setting || mongoose.model('Setting', SettingSchema);