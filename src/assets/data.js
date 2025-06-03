const products = [
  {
    id: 1,
    name: "Traditional Kente Cloth Dress",
    price: 159.99,
    category: "women",
    description: "Authentic Ghanaian Kente cloth dress with vibrant gold and red patterns, perfect for special occasions.\n\nHandwoven by master artisans in Ghana using traditional techniques passed down through generations. The intricate patterns each tell a story and represent different proverbs from Akan culture.",
    shortDescription: "Authentic Ghanaian Kente cloth dress with vibrant gold and red patterns",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520975695911-0a7a7a7a7a7a?auto=format&fit=crop&w=800&q=80"
    ],
    brand: "AfricanRoots",
    inStock: true,
    discount: 15,
    originalPrice: 189.99,
    tags: ["kente", "traditional", "ghana", "ceremonial"],
    reviews: [
      {
        id: 1,
        user: "Ama B.",
        rating: 5,
        date: "2023-06-15",
        title: "Absolutely stunning!",
        comment: "The craftsmanship is incredible and it fits perfectly. Got so many compliments at my sister's wedding!",
        verified: true
      },
      {
        id: 2,
        user: "Kofi M.",
        rating: 4,
        date: "2023-05-22",
        title: "Beautiful but runs small",
        comment: "The dress is gorgeous but I recommend sizing up. The colors are even more vibrant in person.",
        verified: true
      }
    ],
    sku: "KCD-001",
    featured: true,
    material: "100% Cotton Kente",
    details: [
      "Handwoven authentic Kente cloth",
      "Machine wash cold, line dry",
      "Made in Ghana",
      "Includes matching headband",
      "Available in sizes XS-XXL"
    ],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"]
  },
  {
    id: 2,
    name: "Men's Dashiki Shirt",
    price: 45.99,
    category: "men",
    description: "Colorful traditional Dashiki shirt with intricate African print designs.\n\nThis versatile top can be dressed up with slacks for formal occasions or worn casually with jeans. The breathable cotton fabric makes it perfect for warm weather.",
    shortDescription: "Colorful traditional Dashiki shirt with intricate African print designs",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1520975695911-0a7a7a7a7a7a?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1520975695911-0a7a7a7a7a7a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
    ],
    brand: "AfricaWear",
    inStock: true,
    discount: 10,
    originalPrice: 49.99,
    tags: ["dashiki", "african-print", "traditional", "casual"],
    reviews: [
      {
        id: 1,
        user: "Kwame T.",
        rating: 5,
        date: "2023-07-10",
        title: "Perfect for summer",
        comment: "So comfortable and breathable. The colors haven't faded after multiple washes.",
        verified: true
      }
    ],
    sku: "MDS-002",
    featured: true,
    material: "100% Cotton",
    details: [
      "Traditional Yoruba-inspired design",
      "Machine washable",
      "Made in Nigeria",
      "Available in sizes S-XXL",
      "Button closure"
    ],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 3,
    name: "Ankara Print Maxi Dress",
    price: 89.99,
    category: "women",
    description: "Stunning Ankara print maxi dress with flowing silhouette and bold geometric patterns.\n\nThe A-line cut flatters all body types, while the hidden pockets add functionality to this beautiful dress. Perfect for weddings, church, or special events.",
    shortDescription: "Stunning Ankara print maxi dress with flowing silhouette and bold patterns",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1520975695911-0a7a7a7a7a7a?auto=format&fit=crop&w=800&q=80"
    ],
    brand: "WaxPrint",
    inStock: true,
    discount: 20,
    originalPrice: 109.99,
    tags: ["ankara", "maxi-dress", "wax-print", "geometric"],
    reviews: [
      {
        id: 1,
        user: "Nia K.",
        rating: 5,
        date: "2023-08-05",
        title: "Showstopper!",
        comment: "Wore this to a graduation and got stopped constantly with compliments. The fabric is high quality and the cut is perfect.",
        verified: true
      }
    ],
    sku: "APM-003",
    featured: true,
    material: "African Wax Print Cotton",
    details: [
      "Hidden side pockets",
      "Machine wash cold",
      "Made in Senegal",
      "Adjustable waist tie",
      "Length: 58 inches"
    ],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 23,
    name: "Twin Baby Dashiki Onesies",
    price: 24.99,
    category: "kids",
    description: "Adorable set of 2 Dashiki print onesies for babies and toddlers.\n\nMade from soft, breathable cotton that's gentle on baby's skin. The snap closures make diaper changes easy, while the vibrant African prints celebrate heritage from an early age.",
    shortDescription: "Adorable set of 2 Dashiki print onesies for babies and toddlers",
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1520975695911-0a7a7a7a7a7a?auto=format&fit=crop&w=800&q=80",
    additionalImages: [
      "https://images.unsplash.com/photo-1520975695911-0a7a7a7a7a7a?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=800&q=80"
    ],
    brand: "BabyAfrica",
    inStock: true,
    discount: 0,
    originalPrice: 24.99,
    tags: ["kids", "baby", "dashiki", "onesies"],
    reviews: [
      {
        id: 1,
        user: "Mama K.",
        rating: 5,
        date: "2023-09-12",
        title: "Perfect baby shower gift",
        comment: "Bought these for my twins and they're so cute! The fabric is soft and washes well. Will be buying more as they grow.",
        verified: true
      }
    ],
    sku: "TBD-023",
    featured: true,
    material: "100% Organic Cotton",
    details: [
      "Snap closure for easy changing",
      "Machine washable",
      "Made in Ghana",
      "0-3 months size",
      "Set of 2 different prints"
    ],
    sizes: ["0-3M", "3-6M", "6-12M"]
  }
];




export default products
