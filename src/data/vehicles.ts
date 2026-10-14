import { Vehicle } from "@/types";

export const vehiclesData: Vehicle[] = [
  {
    id: "veh-sedan",
    slug: "sedan-car-toyota-axio-prius",
    name: "Luxury Sedan Car",
    model: "Toyota Axio / Premio / Prius Hybrid",
    category: "Car",
    passengerCapacity: 3,
    luggageCapacity: 2,
    airConditioned: true,
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80",
    description: "Quiet, fuel-efficient, and comfortable hybrid sedan. Perfect for solo adventurers, couples, or business executives traveling between Sri Lanka's destinations.",
    features: [
      "Dual Air Conditioning",
      "Complimentary Onboard Wi-Fi Hotspot",
      "Bottled Water & Cold Towels",
      "USB Charging Ports for all passengers",
      "Licensed Professional English-speaking Chauffeur",
      "Full Passenger Insurance Coverage"
    ],
    pricePerDayUSD: 65,
    pricePerKmUSD: 0.38,
    guideOptionSurchargeUSD: 35,
    idealFor: "Couples, solo travelers, honeymooners, and business trips (up to 3 guests)"
  },
  {
    id: "veh-van",
    slug: "luxury-van-toyota-kdh-super-gl",
    name: "High-Roof Luxury Van",
    model: "Toyota KDH Super GL / Commuter",
    category: "Van",
    passengerCapacity: 7,
    luggageCapacity: 6,
    airConditioned: true,
    image: "https://images.unsplash.com/photo-1570125909232-eb263c188f7e?auto=format&fit=crop&w=1200&q=80",
    description: "The gold standard of Sri Lankan private touring. High-roof spacious cabin with reclining plush velvet/leather seats, tinted windows, and generous luggage space.",
    features: [
      "High-Roof Walk-in Cabin",
      "Individually Controllable AC Vents",
      "Reclining Captain Seats with Armrests",
      "Onboard 4G Wi-Fi Router",
      "Cooler Box for Chilled Drinks",
      "Dedicated Chauffeur with extensive island experience"
    ],
    pricePerDayUSD: 95,
    pricePerKmUSD: 0.48,
    guideOptionSurchargeUSD: 40,
    idealFor: "Families with kids, small friend groups, and travelers with ample luggage (4-7 guests)"
  },
  {
    id: "veh-mini-coach",
    slug: "mini-coach-toyota-coaster",
    name: "Executive Mini-Coach",
    model: "Toyota Coaster / Mitsubishi Rosa",
    category: "Mini-coach",
    passengerCapacity: 16,
    luggageCapacity: 14,
    airConditioned: true,
    image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80",
    description: "Spacious, smooth, and designed for tour groups, wedding parties, and corporate retreats. High panoramic windows provide panoramic views of tea hills and coastal highways.",
    features: [
      "Heavy-Duty Climate Control System",
      "Public Address (PA) Microphone System",
      "High Back Ergonomic Reclining Seats",
      "Overhead Parcel Racks & Large Rear Boot",
      "High Ground Clearance for scenic hill routes",
      "Chauffeur plus Assistant Crew"
    ],
    pricePerDayUSD: 160,
    pricePerKmUSD: 0.75,
    guideOptionSurchargeUSD: 45,
    idealFor: "Medium tour groups, corporate delegates, family reunions (8-16 guests)"
  },
  {
    id: "veh-tuktuk",
    slug: "classic-sri-lankan-tuktuk",
    name: "Authentic Sri Lankan Tuk-Tuk",
    model: "Bajaj RE 4-Stroke 205cc (Custom Tropical Wrap)",
    category: "Tuk-tuk",
    passengerCapacity: 2,
    luggageCapacity: 1,
    airConditioned: false,
    image: "https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80",
    description: "The heartbeat of Sri Lankan road culture! Open-sided three-wheeler allowing you to smell the cinnamon and sea breeze. Ideal for day trips, beach hops, and photography trails.",
    features: [
      "Open-Air Tropical Experience",
      "Bluetooth Sound System with Island Playlists",
      "Rain Flaps for sudden showers",
      "Experienced Local Village Driver",
      "Access to narrow country lanes and secret viewpoints"
    ],
    pricePerDayUSD: 35,
    pricePerKmUSD: 0.25,
    guideOptionSurchargeUSD: 20,
    idealFor: "Adventurers, photographers, short city tours in Galle Fort or Kandy Lake (1-2 guests)"
  },
  {
    id: "veh-safari-jeep",
    slug: "4x4-custom-safari-jeep",
    name: "Custom 4x4 Safari Jeep",
    model: "Toyota Hilux / Land Cruiser Raised Safari Edition",
    category: "SUV / Jeep",
    passengerCapacity: 6,
    luggageCapacity: 3,
    airConditioned: false, // Open air for game drives
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    description: "Specially engineered for rugged off-road game tracks in Yala, Wilpattu, Minneriya, and Udawalawe. Raised tiered seating ensures unobstructed 360-degree photography.",
    features: [
      "Tiered Stadium Seating (every seat has a view)",
      "Canvas Canopy with Roll-up Weather Shields",
      "Heavy-Duty Suspension for rough terrain",
      "Binoculars & Field Guidebook onboard",
      "Expert Wildlife Tracker & Off-road Driver",
      "Charging Inverters for DSLR Camera Batteries"
    ],
    pricePerDayUSD: 85,
    pricePerKmUSD: 0.55,
    guideOptionSurchargeUSD: 40,
    idealFor: "National Park safaris, photography expeditions, off-road birding (1-6 guests)"
  },
  {
    id: "veh-suv-prado",
    slug: "luxury-4x4-toyota-prado",
    name: "Luxury VIP SUV",
    model: "Toyota Land Cruiser Prado TX / Fortuner",
    category: "SUV / Jeep",
    passengerCapacity: 4,
    luggageCapacity: 4,
    airConditioned: true,
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=1200&q=80",
    description: "Supreme comfort, elevated ride height, and commanding presence. Combines off-road capability with luxury leather appointments for discerning travelers.",
    features: [
      "All-Terrain 4WD capability",
      "Full Premium Leather Interior",
      "Dual-Zone Automatic Climate Control",
      "Sunroof / Moonroof",
      "Complimentary Wi-Fi and Refreshments",
      "Senior VIP Protocol Chauffeur"
    ],
    pricePerDayUSD: 140,
    pricePerKmUSD: 0.65,
    guideOptionSurchargeUSD: 45,
    idealFor: "VIP couples, diplomats, travelers desiring elevated luxury and smooth handling"
  }
];

