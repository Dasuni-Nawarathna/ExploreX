export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: "Travel Guide" | "Wildlife" | "Culture" | "Practical Tips";
  readTime: string;
  publishedDate: string;
  image: string;
  author: string;
}

export const blogsData: BlogPost[] = [
  {
    id: "blog-train-kandy-ella",
    slug: "complete-guide-scenic-train-kandy-ella",
    title: "The Ultimate Guide to Sri Lanka's Iconic Blue Train from Kandy to Ella",
    summary: "Everything you need to know about booking tickets, which side to sit on, photography tips, and what makes this the world's most scenic rail voyage.",
    category: "Travel Guide",
    readTime: "6 min read",
    publishedDate: "October 14, 2026",
    image: "https://images.unsplash.com/photo-1566296314736-6eaac1ca0cb9?auto=format&fit=crop&w=1200&q=80",
    author: "ExploreX Expedition Team",
    content: `
The train journey between Kandy (or Nanu Oya / Nuwara Eliya) and Ella is frequently hailed as one of the most breathtaking railway journeys in the world. As the iconic blue locomotive rumbles along tracks laid by British colonial engineers in the late 19th century, it negotiates spiraling horseshoe curves, dark hand-hewn stone tunnels, and high mountain viaducts.

### Which Class Should You Book?
1. **1st Class Air-Conditioned Observation Saloon**: Offers plush reserved seating and sealed windows. While comfortable, sealed windows prevent you from sticking your head out to capture the iconic hanging-from-the-door photos.
2. **2nd Class Reserved (Recommended by ExploreX)**: The sweet spot! Large openable windows, overhead ceiling fans, reserved numbered seats, and open doorways where travelers can sit and feel the mountain breeze.
3. **3rd Class Reserved**: Similar to 2nd class with slightly firmer bench seating, vibrant local vendors selling hot crispy vadai and spiced tea.

### Which Side Offers the Best Views?
- **From Kandy to Nanu Oya (Nuwara Eliya)**: Sit on the **RIGHT side** of the train for sweeping vistas of cascading waterfalls and terraced vegetable gardens.
- **From Nanu Oya to Ella**: Switch to the **LEFT side** of the train to gaze into the deep gorges and cloud-topped tea valleys of the Horton Plains plateau.

### Insider Tip from ExploreX Chauffeurs
Ticket booking opens precisely 30 days before travel at 08:00 AM local time and reserved seats sell out in seconds. When you book a customized tour package with ExploreX, our logistics team secures your reserved seats in advance, while your private chauffeur drives your heavy luggage ahead to your hotel in Ella!
    `
  },
  {
    id: "blog-leopard-safaris",
    slug: "best-wildlife-safari-national-parks-sri-lanka",
    title: "Where to See Sri Lanka's Big Four: Leopards, Elephants, Bears & Whales",
    summary: "Sri Lanka is one of only two places on earth where you can witness the world's largest land mammal and sea mammal in a single 24-hour window.",
    category: "Wildlife",
    readTime: "7 min read",
    publishedDate: "September 28, 2026",
    image: "/images/destinations/yala-leopard.jpg",
    author: "Danushka Perera, Senior Naturalist",
    content: `
Sri Lanka boasts staggering biodiversity concentrated within a compact tropical island. Here is where and when to encounter the island's most legendary wildlife species:

### 1. The Sri Lankan Leopard (Yala & Wilpattu)
The Sri Lankan leopard (*Panthera pardus kotiya*) is the island's apex predator. Because there are no lions or tigers to compete with, these big cats are unusually confident and spend daylight hours sunning themselves openly on granite monoliths.
- **Top Parks**: Yala National Park (Blocks 1 & 5) and Wilpattu National Park.
- **Best Season**: February to July (dry season).

### 2. The Asian Elephant (Minneriya, Kaudulla & Udawalawe)
Known as "The Gathering", the dry season spectacle at Minneriya National Park sees between 200 and 400 wild Asian elephants congregate around the ancient Minneriya reservoir bed.
- **Top Parks**: Minneriya (July-September), Udawalawe (year-round guaranteed sightings).

### 3. The Elusive Sloth Bear
Sri Lanka's sloth bear (*Melursus ursinus inornatus*) is shaggy, solitary, and loves termites and ripe palu fruit.
- **Best Season**: May and June when the wild yellow *palu* trees drop sweet fruit in Yala and Wilpattu.

### 4. Blue Whales & Sperm Whales (Mirissa & Trincomalee)
- **Southern Coast (Mirissa)**: November to April.
- **Eastern Coast (Trincomalee)**: May to October.
    `
  },
  {
    id: "blog-weather-guide",
    slug: "when-is-the-best-time-to-visit-sri-lanka",
    title: "Understanding Sri Lanka's Dual Monsoons: The Year-Round Paradise",
    summary: "Because of dual monsoon systems, there is never a bad month to visit Sri Lanka. Discover which coast is bathed in sunshine during each season.",
    category: "Practical Tips",
    readTime: "5 min read",
    publishedDate: "August 19, 2026",
    image: "https://images.unsplash.com/photo-1580910527739-556eb89f9d65?auto=format&fit=crop&w=1200&q=80",
    author: "ExploreX Planning Team",
    content: `
Many first-time travelers to Sri Lanka worry about the tropical monsoons, but the island's geography has a delightful secret: Sri Lanka experiences two distinct weather patterns that affect opposite sides of the island at different times of the year!

### November to April: The South & West Coast Season
- **Sunshine Destinations**: Galle, Mirissa, Bentota, Colombo, Sigiriya, Kandy, Nuwara Eliya, Yala.
- **Conditions**: Calm glassy seas, gentle breezes, crystal-clear diving, and prime blue whale watching.

### May to October: The East Coast & Cultural Triangle
- **Sunshine Destinations**: Trincomalee (Nilaveli), Pasikudah, Arugam Bay, Jaffna, Anuradhapura, Minneriya.
- **Conditions**: While the south coast gets showers, the east coast enjoys bright sunny days, pristine coral snorkelling at Pigeon Island, and world-class right-hand surf breaks at Arugam Bay.
    `
  }
];

