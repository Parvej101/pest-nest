// src/data/products.js

// এটি হলো আপনার "মাস্টার" প্রোডাক্ট লিস্ট (ভবিষ্যতে এটি ডাটাবেস থেকে আসবে)
export const allProducts = [
  // --- Trending Products ---
  { id: 1, name: "Haisenpet Pet Wet Wipes (30 pcs)", imageSrc: "/images/products/wet-wipes.jpg", price: 250, slug: "haisenpet-wet-wipes", isTrending: true, isFeatured: false, saleBadge: "sale" },
  { id: 2, name: "Kitchen Flavor Special Care Urinary...", imageSrc: "/images/products/kitchen-flavor-urinary.jpg", price: 1250, slug: "kitchen-flavor-urinary", isTrending: true, isFeatured: false, saleBadge: "sale" },
  { id: 3, name: "Milk Replacer for Over 3 Days Old K...", imageSrc: "/images/products/milk-replacer.jpg", price: 700, slug: "milk-replacer", isTrending: true, isFeatured: false, saleBadge: "sale" },
  { id: 4, name: "Kitchen Flavor Grain Free Cat Food...", imageSrc: "/images/products/kitchen-flavor-grain-free.jpg", price: 1250, slug: "kitchen-flavor-grain-free", isTrending: true, isFeatured: false, saleBadge: "sale" }, // Both Trending and Featured
  { id: 5, name: "Pet Eye Cleaning Brush – Soft Silic...", imageSrc: "/images/products/eye-brush.jpg", price: 150, slug: "pet-eye-cleaning-brush", isTrending: true, isFeatured: false, saleBadge: "sale" },
  { id: 6, name: "Whiskas Pouch Chicken Flavor adult...", imageSrc: "/images/products/whiskas-pouch.jpg", price: 780, slug: "whiskas-pouch", isTrending: true, isFeatured: false, saleBadge: "sale" },
  { id: 7, name: "Hairball Control Cat Food", imageSrc: "/images/products/hairball-control.jpg", price: 900, slug: "hairball-control-food", isTrending: true, isFeatured: false, discountBadge: "-50 TK" },
  { id: 8, name: "Vitakraft Cat Stick Mini", imageSrc: "/images/products/vitakraft-stick.jpg", price: 1000, slug: "vitakraft-cat-stick", isTrending: true, isFeatured: false, discountBadge: "-101 TK" },

  // --- Featured Products (আগের ডিজাইন থেকে) ---
 {
    id: 9,
    name: "Cat Food",
    imageSrc: "/images/products/pet-food-1.jpg",
    price: 250,
    oldPrice: 300,
    slug: "Catfood",
     isTrending: false, 
    isFeatured: true, 
    category: 'Cat Food'
  },
  {
    id: 10,
    name: "Purina Friskies Indoor",
    imageSrc: "/images/products/pet-food-2.jpg",
    price: 1200,
    slug: "purina-friskies-indoor",
     isTrending: false, 
    isFeatured: true, 
    category: 'Cat Food'
  },
  {
    id: 11,
    name: "Premium Cat Food",
    imageSrc: "/images/products/catfood2.jpg",
    price: 950,
    slug: "meo-cat-food-tuna",
     isTrending: false, 
    isFeatured: true, 
    category: 'Cat Food'
  },
  {
    id: 12,
    name: "SmartHeart Puppy Pack",
    imageSrc: "/images/products/cat-food3.jpg",
    price: 1500,
    oldPrice: 1650,
    slug: "smartheart-power-pack",
     isTrending: false, 
    isFeatured: true, 
    category: 'Cat Food'
  },
  {
    id: 13,
    name: "Cozy Cat Bed",
    imageSrc: "/images/products/bed.jpg",
    price: 1500,
    oldPrice: 1650,
    slug: "bed",
     isTrending: false, 
    isFeatured: true, 
    category: 'Cat Food'
  },
  {
    id: 14,
    name: "Airline Approved Carrier",
    imageSrc: "/images/products/carrier.jpg",
    price: 1500,
    oldPrice: 1650,
    slug: "bag",
    isTrending: false, 
    isFeatured: true, 
    category: 'Cat Food'
  },

];