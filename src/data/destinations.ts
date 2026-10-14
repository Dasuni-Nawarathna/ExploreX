import { Destination } from "@/types";

export const destinationsData: Destination[] = [
  {
    id: "dest-sigiriya",
    slug: "sigiriya",
    name: "Sigiriya",
    subtitle: "The Ancient Lion Rock Citadel & UNESCO Wonder",
    region: "Cultural Triangle",
    category: ["Culture", "Adventure"],
    bestSeason: "Nov - Apr",
    coordinates: { lat: 7.9570, lng: 80.7603 },
    heroImage: "/images/destinations/sigiriya-rock.jpg",
    gallery: [
      "/images/destinations/sigiriya-rock.jpg",
      "https://images.unsplash.com/photo-1612862862126-865765df2ded?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1588598198321-9735fd52455b?auto=format&fit=crop&w=1200&q=80"
    ],
    tag: "UNESCO World Heritage",
    summary: "A 5th-century royal citadel rising 200 meters above tropical jungle, famous for ancient frescoes, water gardens, and the giant lion paws gateway.",
    fullDescription: "Rising dramatically from the central plains, the enigmatic rocky outcrop of Sigiriya is perhaps Sri Lanka's single most dramatic sight. Built by King Kashyapa in the 5th century AD, this majestic fortress compound is framed by landscaped water gardens, boulder gardens, and ancient frescoes depicting celestial nymphs. At the summit plateau, remnants of the royal palace command 360-degree vistas over misty forest canopies.",
    highlights: [
      "Climb to the summit through the colossal carved Lion Gate",
      "Admire the world-renowned 1,500-year-old Sigiriya Frescoes",
      "Stroll the sophisticated symmetrical hydraulic Water Gardens",
      "Catch sunrise or sunset from neighbouring Pidurangala Rock",
      "Elephant safari in nearby Minneriya / Kaudulla National Parks"
    ],
    bestTimeToVisit: "December to April offers dry, sunny mornings ideal for rock climbing. Early morning climbs (06:30 AM) are strongly recommended to beat the midday heat.",
    weatherTips: "Tropical warm; bring sturdy walking shoes, a sun hat, and at least 1.5L of water for the 1,200-step ascent.",
    nearbyAttractions: ["Pidurangala Rock", "Dambulla Cave Temple", "Minneriya National Park", "Hiriwadunna Village Tour"],
    relatedPackageIds: ["pkg-cultural-triangle", "pkg-island-odyssey", "pkg-grand-island"],
    relatedHotelIds: ["htl-vil-uyana", "htl-heritance-kandalama"]
  },
  {
    id: "dest-ella",
    slug: "ella",
    name: "Ella",
    subtitle: "Misty Mountain Peaks, Tea Valleys & Nine Arch Bridge",
    region: "Central Highlands",
    category: ["Hill Country", "Adventure"],
    bestSeason: "Dec - May",
    coordinates: { lat: 6.8667, lng: 81.0466 },
    heroImage: "/images/destinations/ella-nine-arch.jpg",
    gallery: [
      "/images/destinations/ella-nine-arch.jpg",
      "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80"
    ],
    tag: "Highland Paradise",
    summary: "A laid-back mountain hamlet wrapped in emerald tea plantations, tumbling waterfalls, panoramic hiking viewpoints, and the iconic colonial Nine Arch Bridge.",
    fullDescription: "Ella is a peaceful hillside sanctuary nestled in the southern highlands. Revered by hikers and romantics alike, it offers cooler breezes, tranquil terraced tea fields, and breathtaking views through the Ella Gap to the coastal plains below. The world-famous train journey between Kandy and Ella is considered one of the most scenic rail voyages on Earth.",
    highlights: [
      "Watch the blue express train traverse the colonial Nine Arch Bridge",
      "Easy morning trek to Little Adam's Peak with panoramic valley views",
      "Swim in the refreshing natural pools at the base of Diyaluma and Ravana Falls",
      "Sample single-estate Ceylon tea at an operational high-grown tea factory",
      "Take the legendary blue passenger train through misty tea estates"
    ],
    bestTimeToVisit: "January through May boasts clear sky mornings and refreshing evenings. June to September is also pleasant.",
    weatherTips: "Pleasantly cool daytime temperatures (20°C - 25°C) dropping to 14°C at night. Pack a light fleece or windbreaker.",
    nearbyAttractions: ["Nine Arch Bridge", "Little Adam's Peak", "Ravana Falls", "Lipton's Seat", "Diyaluma Falls"],
    relatedPackageIds: ["pkg-island-odyssey", "pkg-honeymoon", "pkg-cultural-triangle"],
    relatedHotelIds: ["htl-98-acres", "htl-tea-factory"]
  },
  {
    id: "dest-galle",
    slug: "galle",
    name: "Galle Fort",
    subtitle: "Colonial Dutch Heritage, Ocean Ramparts & Coastal Chic",
    region: "Southern Coast",
    category: ["Culture", "Beach"],
    bestSeason: "Nov - Apr",
    coordinates: { lat: 6.0329, lng: 80.2168 },
    heroImage: "/images/destinations/galle-fort-lighthouse.jpg",
    gallery: [
      "/images/destinations/galle-fort-lighthouse.jpg",
      "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80"
    ],
    tag: "UNESCO Fortified City",
    summary: "A living 17th-century Dutch fortified town surrounded on three sides by the Indian Ocean, lined with cobblestone streets, boutique cafes, and sunset bastions.",
    fullDescription: "Galle Fort was first built by the Portuguese in 1588 and extensively fortified by the Dutch in the mid-1600s. Today, this UNESCO World Heritage Site is an atmospheric seaside bastion where Dutch colonial architecture blends with South Asian traditions. Stroll along the massive sea-facing ramparts past the iconic white lighthouse at sunset.",
    highlights: [
      "Sunset stroll along the centuries-old ocean ramparts and Flag Rock",
      "Visit the iconic white Galle Lighthouse surrounded by palm trees",
      "Explore boutique jewelers, antique shops, art galleries, and gelato bars",
      "Tour the Dutch Reformed Church and the Historical Mansion Museum",
      "Cycle through the inland paddy fields and cinnamon plantations"
    ],
    bestTimeToVisit: "November through April features calm turquoise seas, sunny days, and lively arts festivals.",
    weatherTips: "Warm and tropical year-round (28°C - 31°C). Ideal for walking; wear comfortable sandals and sun protection.",
    nearbyAttractions: ["Unawatuna Beach", "Jungle Beach", "Koggala Stilt Fishermen", "Handunugoda Tea Estate"],
    relatedPackageIds: ["pkg-island-odyssey", "pkg-honeymoon", "pkg-southern-surf"],
    relatedHotelIds: ["htl-amangalla", "htl-cape-weligama"]
  },
  {
    id: "dest-yala",
    slug: "yala",
    name: "Yala National Park",
    subtitle: "The Kingdom of Sri Lankan Leopards & Untamed Wilds",
    region: "Southern Coast",
    category: ["Wildlife", "Adventure"],
    bestSeason: "Feb - Jul",
    coordinates: { lat: 6.3686, lng: 81.5204 },
    heroImage: "/images/destinations/yala-leopard.jpg",
    gallery: [
      "/images/destinations/yala-leopard.jpg",
      "/images/destinations/udawalawe-elephants.jpg",
      "https://images.unsplash.com/photo-1533484482814-3fe2d922be89?auto=format&fit=crop&w=1200&q=80"
    ],
    tag: "Premier Wildlife Haven",
    summary: "Sri Lanka's premier wildlife park, boasting the highest density of wild leopards in the world alongside Asian elephants, sloth bears, and 215 bird species.",
    fullDescription: "Yala National Park borders the Indian Ocean in the arid south-eastern corner of Sri Lanka. Spanning dry semi-arid scrublands, lagoons, sand dunes, and granite monoliths, Yala is world-renowned for its thriving population of the endemic Sri Lankan leopard (Panthera pardus kotiya). An open-top 4x4 safari with our expert naturalists offers unmatched photographic wildlife encounters.",
    highlights: [
      "Thrilling 4x4 open-top game drives in Block 1 & Block 5",
      "Search for elusive leopards resting on granite boulders",
      "Watch herds of Asian elephants bathing in watering holes",
      "Spot shy sloth bears feeding on palu berries during summer",
      "Birdwatching along the coastal lagoons with painted storks and pelicans"
    ],
    bestTimeToVisit: "February to July is the dry season when animals congregate around dwindling waterholes, maximising sightings.",
    weatherTips: "Dry, hot and dusty; bring neutral colored clothing, binoculars, telephoto lens, and a dust scarf.",
    nearbyAttractions: ["Bundala National Park (Ramsar wetland)", "Kataragama Sacred Temple", "Kirinda Beach"],
    relatedPackageIds: ["pkg-wild-ceylon", "pkg-island-odyssey", "pkg-grand-island"],
    relatedHotelIds: ["htl-cinnamon-wild-yala"]
  },
  {
    id: "dest-kandy",
    slug: "kandy",
    name: "Kandy",
    subtitle: "The Sacred UNESCO City & Temple of the Sacred Tooth Relic (Sri Dalada Maligawa)",
    region: "Central Highlands",
    category: ["Culture", "Hill Country"],
    bestSeason: "Dec - Apr",
    coordinates: { lat: 7.2906, lng: 80.6337 },
    heroImage: "/images/destinations/kandy-temple-tooth.jpg",
    gallery: [
      "/images/destinations/kandy-temple-tooth.jpg",
      "https://images.unsplash.com/photo-1665849050430-5e8c16bacf7e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1665849050332-8d5d7e59afb6?auto=format&fit=crop&w=1200&q=80"
    ],
    tag: "UNESCO Sacred City",
    summary: "Sri Lanka's sacred spiritual heart, home to the golden-canopied Sri Dalada Maligawa (Temple of the Sacred Tooth Relic). Experience mystical Thevava drumming rituals, fragrant lotus offerings, and serene twilight walks around sacred Kandy Lake.",
    fullDescription: "Cradled in a green amphitheater of cloud-capped hills and centered upon the tranquil waters of Kiri Muhuda (Sea of Milk), the Sacred City of Kandy is the spiritual heart of Buddhist Sri Lanka. As the last royal citadel of the Sinhala monarchs to resist European colonial rule until 1815, Kandy remains an enduring sanctuary of ancient Buddhist ritual and sacred heritage.\n\nAt the core of the sacred precinct stands Sri Dalada Maligawa (The Temple of the Sacred Tooth Relic), safeguarding the left canine tooth relic of the Lord Buddha. Step barefoot across cool granite flagstones past the ornate white cloud-drift ramparts (Walakulu Bamma) into the incense-swirled inner sanctum. As the dawn and twilight Thevava rituals begin, the deep cadence of traditional Hevisi drummers and mournful conch shells echoes through carved timber chambers as devotees dressed in white present heaps of fresh jasmine and purple water lilies.\n\nBeyond the temple walls, the sacred city experience unfolds across tranquil evening walks around Kandy Lake, quiet meditation beneath the ancient canopies of Udawattakele Forest Sanctuary, visits to the historic four devales (shrines), and strolls through the imperial Royal Botanical Gardens at Peradeniya with century-old palm avenues.",
    highlights: [
      "Experience the mystical dawn or twilight Thevava pooja ceremony with sacred Hevisi drumming at Sri Dalada Maligawa",
      "Gaze upon the golden canopy, ivory tusks, and jewel-encrusted reliquary casket safeguarding the Sacred Tooth Relic",
      "Peaceful morning circumambulation along the ornamental cloud-drift ramparts (Walakulu Bamma) encircling Kandy Lake",
      "Meditate in the tranquil shade of Udawattakele Forest Sanctuary, the ancient royal hermitage of Kandyan kings",
      "Explore Peradeniya Royal Botanical Gardens, featuring giant Javanese fig trees, palm-lined avenues, and orchid pavilions",
      "Attend an authentic Kandyan Cultural Dance performance with traditional fire-walking, ceremonial drumming, and ves dancers"
    ],
    bestTimeToVisit: "December to April provides pleasant, sunny days with cool evening breezes. July or August hosts the magnificent 10-day Esala Perahera festival, featuring hundreds of ceremonial dancers, whip crackers, and caparisoned tusker elephants.",
    weatherTips: "Temperate tropical mountain climate (22°C - 28°C). Modest white or light attire covering shoulders and knees is strictly observed when entering temple grounds; footwear must be removed at the outer pavilion.",
    nearbyAttractions: ["Sri Dalada Maligawa (Temple of the Tooth)", "Peradeniya Botanical Gardens", "Kandy Lake & Cloud Ramparts", "Udawattakele Forest Sanctuary", "Bahirawakanda Giant Buddha Statue", "Knuckles Mountain Range"],
    relatedPackageIds: ["pkg-cultural-triangle", "pkg-island-odyssey", "pkg-honeymoon"],
    relatedHotelIds: ["htl-heritance-kandalama", "htl-tea-factory", "htl-santani-wellness"]
  },
  {
    id: "dest-mirissa",
    slug: "mirissa",
    name: "Mirissa",
    subtitle: "Golden Palm-Fringed Bays, Surfing & Blue Whale Watching",
    region: "Southern Coast",
    category: ["Beach", "Wildlife"],
    bestSeason: "Nov - Apr",
    coordinates: { lat: 5.9482, lng: 80.4716 },
    heroImage: "/images/destinations/mirissa-coconut-hill.jpg",
    gallery: [
      "/images/destinations/mirissa-coconut-hill.jpg",
      "https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1544750040-4ea9b8a27d38?auto=format&fit=crop&w=1200&q=80"
    ],
    tag: "Tropical Beach Haven",
    summary: "A crescent-shaped golden sand haven acclaimed for offshore blue whale and dolphin encounters, beginner-to-advanced surf breaks, and Coconut Tree Hill.",
    fullDescription: "Mirissa is the quintessential tropical postcard of southern Sri Lanka. Palm trees sway gently over powdery golden sands while the deep waters of the continental shelf lie just miles offshore, providing one of the highest strike rates in the world for sighting the mighty blue whale — the largest animal on Earth.",
    highlights: [
      "Ethical morning boat excursions to spot Blue Whales and playful spinner dolphins",
      "Capture the iconic sunrise photograph at picturesque Coconut Tree Hill",
      "Catch waves at Mirissa reef point or neighbouring Weligama beach break",
      "Sip fresh king coconuts from beachfront hammocks",
      "Feast on freshly grilled seafood caught that afternoon by local outriggers"
    ],
    bestTimeToVisit: "November to April is the prime whale watching season with glassy calm waters and abundant sunshine.",
    weatherTips: "Warm beach climate (29°C - 32°C). High SPF sun protection and sea-sickness tablets are advised for boat tours.",
    nearbyAttractions: ["Coconut Tree Hill", "Parrot Rock", "Secret Beach", "Weligama Bay Surf Schools"],
    relatedPackageIds: ["pkg-southern-surf", "pkg-island-odyssey", "pkg-honeymoon"],
    relatedHotelIds: ["htl-cape-weligama"]
  },
  {
    id: "dest-nuwara-eliya",
    slug: "nuwara-eliya",
    name: "Nuwara Eliya",
    subtitle: "Little England: Misty Tea Plantations, Waterfalls & Heritage",
    region: "Central Highlands",
    category: ["Hill Country", "Culture"],
    bestSeason: "Feb - May",
    coordinates: { lat: 6.9497, lng: 80.7891 },
    heroImage: "/images/destinations/ceylon-tea-plantations.jpg",
    gallery: [
      "/images/destinations/ceylon-tea-plantations.jpg",
      "https://images.unsplash.com/photo-1586861635167-e5223aadc9fe?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=1200&q=80"
    ],
    tag: "Highland Tea Haven",
    summary: "Perched 1,868 meters above sea level amidst misty hills, famous for colonial English cottages, manicured golf courses, Lake Gregory, and world-class Ceylon tea.",
    fullDescription: "Affectionately dubbed 'Little England' by 19th-century British planters, Nuwara Eliya is the capital of Sri Lanka's tea industry. With cool alpine air, tudor-style mansions, red brick post offices, and rolling valleys carpeted in tea bushes, it offers a stark, refreshing contrast to the sun-soaked coast.",
    highlights: [
      "High tea and fresh strawberry scones in a colonial heritage hotel",
      "Visit Pedro or Mackwoods Tea Estate to watch orthodox tea processing",
      "Sunrise trek across Horton Plains National Park to World's End precipice",
      "Paddle boating and horse riding beside Lake Gregory",
      "Marvel at cascading waterfalls including Ramboda Falls and St. Clair's Falls"
    ],
    bestTimeToVisit: "February to April is the dry season with blue skies and blooming flowers. April hosts the lively spring festival.",
    weatherTips: "Crisp cool climate (10°C - 20°C). Bring warm layers, sweaters, and a waterproof jacket.",
    nearbyAttractions: ["Horton Plains & World's End", "Lake Gregory", "Hakgala Botanical Garden", "Ramboda Falls"],
    relatedPackageIds: ["pkg-cultural-triangle", "pkg-grand-island"],
    relatedHotelIds: ["htl-tea-factory"]
  },
  {
    id: "dest-trincomalee",
    slug: "trincomalee",
    name: "Trincomalee",
    subtitle: "Pristine East Coast, Pigeon Island Coral Reefs & Koneswaram",
    region: "Eastern Coast",
    category: ["Beach", "Culture", "Adventure"],
    bestSeason: "May - Oct",
    coordinates: { lat: 8.5874, lng: 81.2152 },
    heroImage: "https://images.unsplash.com/photo-1650970366119-34cb82f8b4c1?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1650970366119-34cb82f8b4c1?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600255821058-c4f89958d700?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?auto=format&fit=crop&w=1200&q=80"
    ],
    tag: "East Coast Pearl",
    summary: "One of the world's finest natural deep-water harbours, boasting white sand beaches at Nilaveli, live coral reef snorkelling at Pigeon Island, and the cliffside Koneswaram Temple.",
    fullDescription: "When the southwest monsoon touches the southern beaches, Trincomalee on the northeast coast enjoys glorious dry sunshine and turquoise waters. Home to the legendary Swami Rock and Koneswaram Hindu temple overlooking crashing ocean waves, it is also the gateway to Pigeon Island Marine National Park.",
    highlights: [
      "Snorkel with blacktip reef sharks and sea turtles at Pigeon Island",
      "Visit the sacred cliffside Koneswaram Temple and Lover's Leap",
      "Relax on powdery white sands at Nilaveli and Uppuveli beaches",
      "Spot sperm whales and dolphins on offshore catamaran excursions",
      "Dip in the ancient Kanniya Hot Springs"
    ],
    bestTimeToVisit: "May to October offers the best conditions: calm turquoise seas, crystal underwater visibility, and sunny days.",
    weatherTips: "Sunny and hot (30°C - 34°C); great for water sports, scuba diving, and boat charters.",
    nearbyAttractions: ["Pigeon Island Marine Park", "Nilaveli Beach", "Fort Frederick", "Kanniya Hot Springs"],
    relatedPackageIds: ["pkg-grand-island"],
    relatedHotelIds: ["htl-trinco-blu"]
  },
  {
    id: "dest-jaffna",
    slug: "jaffna",
    name: "Jaffna",
    subtitle: "Vibrant Tamil Culture, Palmyra Groves & Nallur Temple",
    region: "Northern Peninsula",
    category: ["Culture", "Adventure"],
    bestSeason: "Jan - Sep",
    coordinates: { lat: 9.6615, lng: 80.0255 },
    heroImage: "https://images.unsplash.com/photo-1591410448119-1b49cbb3b83e?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1591410448119-1b49cbb3b83e?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1568843240915-b512cc9b4415?auto=format&fit=crop&w=1200&q=80"
    ],
    tag: "Northern Cultural Jewel",
    summary: "The cultural hub of northern Sri Lanka, characterized by towering golden temple gopurams, palmyra-dotted landscapes, rich fiery crab curries, and quiet offshore islands.",
    fullDescription: "Long isolated, the northern peninsula of Jaffna has re-emerged as one of Sri Lanka's most fascinating cultural destinations. Visitors discover distinct Dravidian architecture, serene Hindu sanctuaries like Nallur Kandaswamy Kovil, historic Dutch fortifications, and unique culinary traditions famous for fiery Jaffna crab curry.",
    highlights: [
      "Marvel at the golden arches and elaborate rituals of Nallur Kandaswamy Kovil",
      "Take the public ferry to remote Nainativu Island (Nagapooshani Amman Temple)",
      "Explore the star-shaped Jaffna Dutch Fort overlooking the lagoon",
      "Feast on authentic Jaffna crab curry and sweet Rio ice cream",
      "Walk the sand spits of Casuarina Beach in Karainagar"
    ],
    bestTimeToVisit: "January through September is dry and pleasant. The grand Nallur festival takes place in August.",
    weatherTips: "Warm and arid; dress respectfully when visiting Hindu temples (men may be required to remove shirts before entering the inner sanctum).",
    nearbyAttractions: ["Nallur Kovil", "Jaffna Fort", "Delft Island", "Casuarina Beach", "Keerimalai Springs"],
    relatedPackageIds: ["pkg-grand-island"],
    relatedHotelIds: ["htl-fox-jaffna"]
  },
  {
    id: "dest-arugam-bay",
    slug: "arugam-bay",
    name: "Arugam Bay",
    subtitle: "World-Class Right Hand Point Break & Bohemian Surf Life",
    region: "Eastern Coast",
    category: ["Beach", "Adventure", "Wildlife"],
    bestSeason: "May - Oct",
    coordinates: { lat: 6.8415, lng: 81.8340 },
    heroImage: "https://images.unsplash.com/photo-1544750040-4ea9b8a27d38?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544750040-4ea9b8a27d38?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519566335946-e6f65f0f4fdf?auto=format&fit=crop&w=1200&q=80"
    ],
    tag: "Surfer's Mecca",
    summary: "A world-renowned surf destination on Sri Lanka's southeast coast featuring consistent right-hand point breaks, beach cafes, and wild elephant lagoon safaris.",
    fullDescription: "Consistently ranked among the top ten surf spots on the planet, Arugam Bay attracts wave riders, free spirits, and nature lovers. Beyond the legendary Main Point wave, the surrounding wilderness is alive with wild elephants wandering near freshwater lagoons and ancient jungle ruins like Kudumbigala.",
    highlights: [
      "Ride the legendary right-hand peeling wave at Main Point",
      "Elephant-spotting kayak safaris along Kottukal Lagoon at sunset",
      "Panoramic views and Buddhist hermitages at Kudumbigala Monastery",
      "Beginner surf lessons at gentle Peanut Farm beach",
      "Chill beach bars, yoga shalas, and organic smoothie bowls"
    ],
    bestTimeToVisit: "May to October brings offshore winds, consistent ocean swells, and sunny weather.",
    weatherTips: "Hot and coastal dry (28°C - 33°C); great for active travelers, backpackers, and surfers.",
    nearbyAttractions: ["Peanut Farm Beach", "Whiskey Point", "Kottukal Lagoon", "Kumana National Park"],
    relatedPackageIds: ["pkg-grand-island"],
    relatedHotelIds: ["htl-trinco-blu"]
  }
];

