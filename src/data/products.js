export const allProducts = [
  {
    id: 1,
    name: "Drools Absolute Calcium Bone Pouch",
    slug: "drools-absolute-calcium-bone-pouch",
    imageSrc: "/images/products/drools-calcium-bone.png",
    galleryImages: [
      { id: 'g1', src: '/images/products/smartheart-power-pack.png', alt: 'Drools Calcium Bone Pouch' },
      { id: 'g2', src: '/images/products/reflex-plus-chicken.png', alt: 'Dog enjoying the bone' }
    ],
    price: 320,
    oldPrice: 350,
    isFeatured: true,
    isTrending: false,
    category: 'Treats',
    description: 'Calcium-rich bones to strengthen teeth and bones for your dog. A healthy and delicious treat.'
  },
  {
    id: 2,
    name: "SmartHeart Adult Dog Food Power Pack",
    slug: "smartheart-adult-dog-food-power-pack",
    imageSrc: "/images/products/smartheart-power-pack.png",
    galleryImages: [
      { id: 'g1', src: '/images/products/smartheart-power-pack-g1.jpg', alt: 'SmartHeart Power Pack bag' },
      { id: 'g2', src: '/images/products/smartheart-power-pack-g2.jpg', alt: 'Kibble close-up' },
      { id: 'g3', src: '/images/products/smartheart-power-pack-g3.jpg', alt: 'Healthy adult dog' }
    ],
    price: 2650,
    oldPrice: null,
    isFeatured: true,
    isTrending: true,
    category: 'Dog Food',
    description: 'High-energy formula for active adult dogs. Packed with essential nutrients for optimal health.'
  },
  {
    id: 3,
    name: "Reflex Plus Adult Cat Food - Chicken",
    slug: "reflex-plus-adult-cat-food-chicken",
    imageSrc: "/images/products/reflex-plus-chicken.png",
    galleryImages: [
      { id: 'g1', src: '/images/products/reflex-plus-chicken-g1.jpg', alt: 'Reflex Plus Chicken packaging' },
      { id: 'g2', src: '/images/products/reflex-plus-chicken-g2.jpg', alt: 'Cat eating Reflex Plus' }
    ],
    price: 1550,
    oldPrice: null,
    isFeatured: true,
    isTrending: false,
    category: 'Cat Food',
    description: 'Super premium dry cat food with chicken, suitable for all adult cat breeds.'
  },
  // {
  //   id: 4,
  //   name: "Me-O Delite Wet Food Tuna with Crab",
  //   slug: "meo-delite-wet-food-tuna-crab",
  //   imageSrc: "/images/products/meo-delite-tuna-crab.png",
  //   galleryImages: [
  //     { id: 'g1', src: '/images/products/meo-delite-tuna-crab-g1.jpg', alt: 'Me-O Delite Pouch' }
  //   ],
  //   price: 90,
  //   oldPrice: null,
  //   isFeatured: true,
  //   isTrending: true,
  //   category: 'Cat Food',
  //   description: 'Delicious wet food pouch made with real tuna and crab stick for a taste cats love.'
  // },
  // {
  //   id: 5,
  //   name: "Bioline Catnip Bubbles for Cats",
  //   slug: "bioline-catnip-bubbles",
  //   imageSrc: "/images/products/bioline-catnip-bubbles.png",
  //   galleryImages: [
  //     { id: 'g1', src: '/images/products/bioline-catnip-bubbles-g1.jpg', alt: 'Catnip bubbles bottle' },
  //     { id: 'g2', src: '/images/products/bioline-catnip-bubbles-g2.jpg', alt: 'Cat playing with bubbles' }
  //   ],
  //   price: 450,
  //   oldPrice: null,
  //   isFeatured: true,
  //   isTrending: false,
  //   category: 'Toys',
  //   description: 'A fun and interactive toy for your cat. The catnip-infused bubbles will drive your cat wild with excitement.'
  // },
  // {
  //   id: 6,
  //   name: "Versele-Laga Oropharma Cat Litter",
  //   slug: "versele-laga-cat-litter",
  //   imageSrc: "/images/products/versele-laga-litter.jpg",
  //   galleryImages: [
  //     { id: 'g1', src: '/images/products/versele-laga-litter-g1.jpg', alt: 'Versele-Laga Cat Litter box' }
  //   ],
  //   price: 1350,
  //   oldPrice: null,
  //   isFeatured: true,
  //   isTrending: false,
  //   category: 'Litter & Accessories',
  //   description: 'High-quality, clumping cat litter with superior odor control.'
  // },
  // {
  //   id: 7,
  //   name: "Trixie Nail Clipper for Dogs & Cats",
  //   slug: "trixie-nail-clipper",
  //   imageSrc: "/images/products/trixie-nail-clipper.jpg",
  //   galleryImages: [
  //     { id: 'g1', src: '/images/products/trixie-nail-clipper-g1.jpg', alt: 'Trixie Nail Clipper' },
  //     { id: 'g2', src: '/images/products/trixie-nail-clipper-g2.jpg', alt: 'Clipping a dogs nails' }
  //   ],
  //   price: 650,
  //   oldPrice: null,
  //   isTrending: true,
  //   isFeatured: false,
  //   category: 'Grooming',
  //   description: 'Professional nail clippers for safe and easy grooming of your pet\'s nails.'
  // },
  // {
  //   id: 8,
  //   name: "Beaphar Dog Shampoo Macadamia Oil",
  //   slug: "beaphar-dog-shampoo-macadamia",
  //   imageSrc: "/images/products/beaphar-shampoo.jpg",
  //   galleryImages: [
  //     { id: 'g1', src: '/images/products/beaphar-shampoo-g1.jpg', alt: 'Beaphar Dog Shampoo bottle' }
  //   ],
  //   price: 700,
  //   oldPrice: 750,
  //   isTrending: true,
  //   isFeatured: false,
  //   category: 'Grooming',
  //   description: 'A nourishing shampoo with Macadamia Oil for a soft and shiny coat.'
  // },
  // {
  //   id: 9,
  //   name: "Bonacibo Adult Cat Food Lamb & Rice",
  //   slug: "bonacibo-adult-cat-food-lamb-rice",
  //   imageSrc: "/images/products/bonacibo-lamb.jpg",
  //   galleryImages: [
  //     { id: 'g1', src: '/images/products/bonacibo-lamb-g1.jpg', alt: 'Bonacibo Cat Food packaging' },
  //     { id: 'g2', src: '/images/products/bonacibo-lamb-g2.jpg', alt: 'Cat food kibbles' }
  //   ],
  //   price: 1600,
  //   oldPrice: null,
  //   isTrending: true,
  //   isFeatured: true,
  //   category: 'Cat Food',
  //   description: 'Formulated with an optimal balance of protein, fats and carbohydrates to provide energy & vitality.'
  // },
  // {
  //   id: 10,
  //   name: "Cature Rollin` Fun Mint & Catnip Ball",
  //   slug: "cature-rollin-fun-mint-catnip-ball",
  //   imageSrc: "/images/products/cature-catnip-ball.jpg",
  //   galleryImages: [
  //     { id: 'g1', src: '/images/products/cature-catnip-ball-g1.jpg', alt: 'Cature catnip ball toy' },
  //     { id: 'g2', src: '/images/products/cature-catnip-ball-g2.jpg', alt: 'Cat playing with the ball' }
  //   ],
  //   price: 400,
  //   oldPrice: null,
  //   isTrending: true,
  //   isFeatured: false,
  //   category: 'Toys',
  //   description: 'A fun rolling toy made with natural mint and premium catnip to keep your cat engaged.'
  // },
  // {
  //   id: 11,
  //   name: "Cozy Fleece Pet Bed",
  //   slug: "cozy-fleece-pet-bed",
  //   imageSrc: "/images/products/cozy-fleece-bed.jpg",
  //   galleryImages: [
  //     { id: 'g1', src: '/images/products/cozy-fleece-bed-g1.jpg', alt: 'Top view of the pet bed' },
  //     { id: 'g2', src: '/images/products/cozy-fleece-bed-g2.jpg', alt: 'Dog sleeping in the bed' }
  //   ],
  //   price: 1800,
  //   oldPrice: null,
  //   isTrending: false,
  //   isFeatured: false,
  //   category: 'Accessories',
  //   description: 'An ultra-soft fleece bed for ultimate comfort. Machine washable and durable.'
  // },
  {
    id: 12,
    name: "Airline Approved Pet Carrier",
    slug: "airline-approved-pet-carrier",
    imageSrc: "/images/products/pet-carrier.jpg",
    galleryImages: [
      { id: 'g1', src: '/images/products/pet-carrier-g1.jpg', alt: 'Front view of the carrier' },
      { id: 'g2', src: '/images/products/pet-carrier-g2.jpg', alt: 'Side view with ventilation mesh' }
    ],
    price: 2500,
    oldPrice: 2800,
    isTrending: false,
    isFeatured: false,
    category: 'Accessories',
    description: 'Safe and comfortable carrier for traveling with your pet. Meets most airline regulations.'
  },
  {
    id: 13,
    name: "Cozy Cat Bed",
    slug: "cozy-cat-bed",
    imageSrc: "/images/products/bed.jpg",
    galleryImages: [
      { id: 'g1', src: '/images/products/bed.jpg', alt: 'Cozy Cat Bed' },
      { id: 'g2', src: '/images/products/cozy-fleece-bed-g2.jpg', alt: 'Cat sleeping in the bed' }
    ],
    price: 1500,
    oldPrice: 1650,
    isTrending: false,
    isFeatured: true,
    category: 'Accessories',
    description: 'A soft and comfortable bed for your cat to rest and relax in. Perfect for naps.'
  },
  {
    id: 14,
    name: "Airline Approved Carrier Bag",
    slug: "airline-approved-carrier-bag",
    imageSrc: "/images/products/carrier.jpg",
    galleryImages: [
      { id: 'g1', src: '/images/products/pet-carrier-g1.jpg', alt: 'Front view of the carrier' },
      { id: 'g2', src: '/images/products/pet-carrier-g2.jpg', alt: 'Side view with ventilation mesh' }
    ],
    price: 1500,
    oldPrice: 1650,
    isTrending: false,
    isFeatured: true,
    category: 'Accessories',
    description: 'Safe and comfortable carrier bag for traveling with your pet. Meets most airline regulations.'
  },
  {
    id: 15,
    name: "Basic Cat Food",
    slug: "basic-cat-food",
    imageSrc: "/images/products/pet-food-1.jpg",
    galleryImages: [
      { id: 'g1', src: '/images/products/pet-food-1.jpg', alt: 'Basic Cat Food' }
    ],
    price: 250,
    oldPrice: 300,
    isTrending: false,
    isFeatured: true,
    category: 'Cat Food',
    description: 'A balanced and nutritious everyday meal for your beloved cat, providing essential vitamins.'
  },
  {
    id: 16,
    name: "Purina Friskies Indoor",
    slug: "purina-friskies-indoor",
    imageSrc: "/images/products/pet-food-2.jpg",
    galleryImages: [
      { id: 'g1', src: '/images/products/pet-food-2.jpg', alt: 'Purina Friskies Indoor' }
    ],
    price: 1200,
    oldPrice: null,
    isTrending: false,
    isFeatured: true,
    category: 'Cat Food',
    description: 'Specially formulated for indoor cats to help control hairballs and maintain a healthy weight.'
  },
  {
    id: 17,
    name: "Premium Cat Food - Tuna",
    slug: "premium-cat-food-tuna",
    imageSrc: "/images/products/catfood2.jpg",
    galleryImages: [
      { id: 'g1', src: '/images/products/catfood2.jpg', alt: 'Premium Cat Food with Tuna' }
    ],
    price: 950,
    oldPrice: null,
    isTrending: false,
    isFeatured: true,
    category: 'Cat Food',
    description: 'High-quality premium cat food with real tuna, packed with Omega-3 and essential nutrients.'
  },
  {
    id: 18,
    name: "SmartHeart Puppy Power Pack",
    slug: "smartheart-puppy-power-pack",
    imageSrc: "/images/products/cat-food3.jpg",
    galleryImages: [
      { id: 'g1', src: '/images/products/cat-food3.jpg', alt: 'SmartHeart Puppy Power Pack' }
    ],
    price: 1500,
    oldPrice: 1650,
    isTrending: false,
    isFeatured: true,
    category: 'Dog Food',
    description: 'A complete and balanced diet to support the healthy growth and development of your puppy.'
  }
];