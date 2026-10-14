import { Hotel } from "@/types";

export const hotelsData: Hotel[] = [
  {
    id: "htl-vil-uyana",
    slug: "jetwing-vil-uyana",
    name: "Jetwing Vil Uyana",
    refCode: "HTL-001",
    destinationId: "dest-sigiriya",
    destinationName: "Sigiriya",
    type: "Eco Lodge",
    starRating: 5,
    pricePerNightUSD: 280,
    priceRange: "$$$$",
    coordinates: { lat: 7.9400, lng: 80.7200 },
    heroImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Private Plunge Pool", "Paddy Field Pavilions", "Ayurvedic Wellness Spa", "Free Wi-Fi", "Butler Service"],
    description: "Chalets hover above reed beds and living rice paddies with the 5th-century Sigiriya rock citadel in the backdrop.",
    address: "Rangirigama, Sigiriya, Cultural Triangle, Sri Lanka",
    featured: true,
    roomTypes: [
      { name: "Paddy Dwelling with Plunge Pool", description: "Luxury thatched villa perched over living emerald rice paddies.", priceUSD: 280 },
      { name: "Water Dwelling on Stilts", description: "Romantic bungalow raised directly above wetland lagoon waters.", priceUSD: 330 }
    ]
  },
  {
    id: "htl-amangalla",
    slug: "amangalla-galle-fort",
    name: "Amangalla",
    refCode: "HTL-002",
    destinationId: "dest-galle",
    destinationName: "Galle Fort",
    type: "Heritage Hotel",
    starRating: 5,
    pricePerNightUSD: 450,
    priceRange: "$$$$",
    coordinates: { lat: 6.0270, lng: 80.2180 },
    heroImage: "/images/destinations/galle-fort-lighthouse.jpg",
    gallery: [
      "/images/destinations/galle-fort-lighthouse.jpg",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Colonial Architecture", "The Baths Hydrotherapy", "Garden Swimming Pool", "High Tea Verandah"],
    description: "Nestled within the 17th-century ramparts of UNESCO-listed Galle Fort, Amangalla is an enduring testament to colonial grandeur.",
    address: "10 Church Street, Galle Fort 80000, Sri Lanka",
    featured: true,
    roomTypes: [
      { name: "Heritage Bedroom", description: "Spacious room with period antiques and four-poster beds.", priceUSD: 450 },
      { name: "Amangalla Suite", description: "Grand suite with separate drawing room and courtyard views.", priceUSD: 720 }
    ]
  },
  {
    id: "htl-98-acres",
    slug: "98-acres-resort-ella",
    name: "98 Acres Resort & Spa",
    refCode: "HTL-003",
    destinationId: "dest-ella",
    destinationName: "Ella",
    type: "Boutique Villa",
    starRating: 5,
    pricePerNightUSD: 240,
    priceRange: "$$$",
    coordinates: { lat: 6.8670, lng: 81.0530 },
    heroImage: "/images/destinations/ella-nine-arch.jpg",
    gallery: [
      "/images/destinations/ella-nine-arch.jpg",
      "/images/destinations/ceylon-tea-plantations.jpg",
      "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Panoramic Tea Views", "Outdoor Heated Pool", "Spa 98", "Helipad Onsite", "Free Wi-Fi"],
    description: "An elegant, chic eco-luxury boutique hotel that stands on a scenic 98-acre tea estate overlooking Little Adam's Peak.",
    address: "Greenland Estate, Passara Road, Ella, Sri Lanka",
    featured: true,
    roomTypes: [
      { name: "Standard Deluxe Chalet", description: "Rustic elegance with private balcony facing Little Adam's Peak.", priceUSD: 240 },
      { name: "Grand Executive Suite with Pool", description: "Top-tier suite with private plunge pool.", priceUSD: 440 }
    ]
  },
  {
    id: "htl-cinnamon-wild-yala",
    slug: "cinnamon-wild-yala",
    name: "Cinnamon Wild Yala",
    refCode: "HTL-004",
    destinationId: "dest-yala",
    destinationName: "Yala National Park",
    type: "Eco Lodge",
    starRating: 4,
    pricePerNightUSD: 195,
    priceRange: "$$$",
    coordinates: { lat: 6.3320, lng: 81.4420 },
    heroImage: "/images/destinations/yala-leopard.jpg",
    gallery: [
      "/images/destinations/yala-leopard.jpg",
      "https://images.unsplash.com/photo-1534177616072-ef7dc120449d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544979590-37e9b47eb705?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Bordering National Park", "Rooftop Observation Bar", "Resident Naturalists", "Swimming Pool"],
    description: "Positioned directly on the edge of Yala National Park and the Indian Ocean, where leopards occasionally pass the perimeter.",
    address: "Palatupana, Yala 82600, Sri Lanka",
    featured: true,
    roomTypes: [
      { name: "Jungle Chalet", description: "Comfortable safari chalet tucked in coastal scrub.", priceUSD: 195 },
      { name: "Beach Chalet", description: "Perched on sand dunes with breezy views of the southern ocean.", priceUSD: 235 }
    ]
  },
  {
    id: "htl-cape-weligama",
    slug: "cape-weligama-resort",
    name: "Cape Weligama",
    refCode: "HTL-005",
    destinationId: "dest-mirissa",
    destinationName: "Mirissa / Weligama",
    type: "5-Star Resort",
    starRating: 5,
    pricePerNightUSD: 420,
    priceRange: "$$$$",
    coordinates: { lat: 5.9680, lng: 80.4350 },
    heroImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1580910527739-556eb89f9d65?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["60m Crescent Infinity Pool", "Butler Service", "PADI Dive Center", "Ocean Clifftop Dining"],
    description: "Perched atop a soaring headland 40 meters above the Indian Ocean, offering uninterrupted ocean vistas.",
    address: "Abimanagama Road, Weligama, Sri Lanka",
    featured: false,
    roomTypes: [
      { name: "Ocean Villa", description: "130 sqm luxury villa with steam room and shared pool.", priceUSD: 420 }
    ]
  },
  {
    id: "htl-tea-factory",
    slug: "heritance-tea-factory",
    name: "Heritance Tea Factory",
    refCode: "HTL-006",
    destinationId: "dest-nuwara-eliya",
    destinationName: "Nuwara Eliya",
    type: "Heritage Hotel",
    starRating: 4,
    pricePerNightUSD: 180,
    priceRange: "$$$",
    coordinates: { lat: 6.9800, lng: 80.8400 },
    heroImage: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566296517004-220e9366119d?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Converted 1930s Tea Factory", "TCK Train Restaurant", "Tea Plucking", "Six Senses Spa"],
    description: "A converted 19th-century colonial tea factory high in the misty hills of Nuwara Eliya.",
    address: "Kandapola, Nuwara Eliya, Sri Lanka",
    featured: false,
    roomTypes: [
      { name: "Superior Room", description: "Warm timber details and views of tea terraces.", priceUSD: 180 }
    ]
  },
  {
    id: "htl-trinco-blu",
    slug: "trinco-blu-by-cinnamon",
    name: "Trinco Blu by Cinnamon",
    refCode: "HTL-007",
    destinationId: "dest-trincomalee",
    destinationName: "Trincomalee",
    type: "Beachfront Guesthouse",
    starRating: 4,
    pricePerNightUSD: 140,
    priceRange: "$$",
    coordinates: { lat: 8.6010, lng: 81.2290 },
    heroImage: "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1650970366119-34cb82f8b4c1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Beachfront Access", "Whale Watching Desk", "PADI Dive Center", "Seafood Crab Restaurant"],
    description: "A retro-chic maritime resort on Uppuveli Beach, gateway to Pigeon Island coral snorkeling.",
    address: "Sambalthivu, Uppuveli, Trincomalee, Sri Lanka",
    featured: false,
    roomTypes: [
      { name: "Superior Beach Room", description: "Bright coastal room opening straight toward the sand.", priceUSD: 140 }
    ]
  },
  {
    id: "htl-fox-jaffna",
    slug: "fox-resorts-jaffna",
    name: "Fox Resorts Jaffna",
    refCode: "HTL-008",
    destinationId: "dest-jaffna",
    destinationName: "Jaffna",
    type: "Boutique Villa",
    starRating: 4,
    pricePerNightUSD: 130,
    priceRange: "$$",
    coordinates: { lat: 9.6800, lng: 80.0200 },
    heroImage: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Art Gallery & Bunkers", "Swimming Pool", "Northern Jaffna Cuisine", "Air Conditioning"],
    description: "A historic family estate transformed into a serene heritage boutique hotel.",
    address: "Kokuvil, Jaffna, Sri Lanka",
    featured: false,
    roomTypes: [
      { name: "Deluxe Heritage Room", description: "Elegantly restored room blending colonial charm.", priceUSD: 130 }
    ]
  },
  {
    id: "htl-heritance-kandalama",
    slug: "heritance-kandalama",
    name: "Heritance Kandalama",
    refCode: "HTL-009",
    destinationId: "dest-sigiriya",
    destinationName: "Dambulla / Sigiriya",
    type: "5-Star Resort",
    starRating: 5,
    pricePerNightUSD: 210,
    priceRange: "$$$$",
    coordinates: { lat: 7.8680, lng: 80.7080 },
    heroImage: "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Geoffrey Bawa Architecture", "3 Infinity Pools", "Ayurvedic Spa", "Lakeview Dining"],
    description: "Designed by legendary architect Geoffrey Bawa, this eco-resort merges into a jungle cliffside overlooking ancient Kandalama Lake.",
    address: "PO Box 11, Dambulla 21100, Sri Lanka",
    featured: true,
    roomTypes: [
      { name: "Superior Lakeview Room", description: "Large glass windows overlooking Kandalama lake and Sigiriya rock.", priceUSD: 210 }
    ]
  },
  {
    id: "htl-santani-wellness",
    slug: "santani-wellness-resort",
    name: "Santani Wellness Resort",
    refCode: "HTL-010",
    destinationId: "dest-kandy",
    destinationName: "Kandy",
    type: "Boutique Villa",
    starRating: 5,
    pricePerNightUSD: 360,
    priceRange: "$$$$",
    coordinates: { lat: 7.3300, lng: 80.7500 },
    heroImage: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1609137144813-7d9921338f24?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Hydrotherapy Thermal Salt Pool", "Ayurvedic Doctors", "Yoga Pavilions", "Knuckles Forest Views"],
    description: "An internationally acclaimed wellness retreat set on a former 48-acre tea estate in the misty Knuckles mountains.",
    address: "Arantenna Estate, Bobebila, Kandy, Sri Lanka",
    featured: false,
    roomTypes: [
      { name: "Mountain View Chalet", description: "Glass-walled minimalist sanctuary with sweeping valley views.", priceUSD: 360 }
    ]
  },
  {
    id: "htl-fort-bazaar",
    slug: "the-fort-bazaar-galle",
    name: "The Fort Bazaar",
    refCode: "HTL-011",
    destinationId: "dest-galle",
    destinationName: "Galle Fort",
    type: "Heritage Hotel",
    starRating: 5,
    pricePerNightUSD: 270,
    priceRange: "$$$",
    coordinates: { lat: 6.0290, lng: 80.2170 },
    heroImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80",
      "/images/destinations/galle-fort-lighthouse.jpg",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Zest Restaurant", "Private Cinema", "Courtyard Spa", "Boutique Design"],
    description: "A 17th-century merchant house converted into a contemporary 18-room boutique hotel on historic Church Street.",
    address: "26 Church Street, Galle Fort, Sri Lanka",
    featured: false,
    roomTypes: [
      { name: "Bazaar Bedroom", description: "High-ceilinged room with brass fixtures and courtyard views.", priceUSD: 270 }
    ]
  },
  {
    id: "htl-jetwing-blue",
    slug: "jetwing-blue-negombo",
    name: "Jetwing Blue",
    refCode: "HTL-012",
    destinationId: "dest-colombo",
    destinationName: "Negombo / Coastal",
    type: "5-Star Resort",
    starRating: 5,
    pricePerNightUSD: 165,
    priceRange: "$$$",
    coordinates: { lat: 7.2200, lng: 79.8400 },
    heroImage: "https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80"
    ],
    amenities: ["Beachfront Oceanfront", "2 Large Swimming Pools", "Ayurvedic Center", "Seafood Dining"],
    description: "A spacious beachfront resort directly on the golden sands of Negombo, perfect for arrival recovery.",
    address: "Porutota Road, Ethukale, Negombo, Sri Lanka",
    featured: false,
    roomTypes: [
      { name: "Deluxe Ocean View", description: "Spacious private balcony with panoramic sunset views.", priceUSD: 165 }
    ]
  }
];
