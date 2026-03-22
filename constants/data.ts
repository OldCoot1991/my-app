// ─── PRODUCT TYPE ──────────────────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  price: string;
  rating: number;
  reviews: number;
  badge: string | null;
  description: string;
  longDescription: string;
  specs: string[];
  inStock: boolean;
  features: string[];
  image: string;
  images?: string[];
}

// ─── CATEGORY TYPE ─────────────────────────────────────────────────────────
export interface Category {
  id: string;
  name: string;
  count: string;
  emoji: string;
}

// ─── CATEGORIES DATA ───────────────────────────────────────────────────────
export const CATEGORIES: Category[] = [
  { id: "1", name: "Boards", count: "24 товара", emoji: "🖥️" },
  { id: "2", name: "Controllers", count: "46 товаров", emoji: "🎮" },
  { id: "3", name: "Displays", count: "12 товаров", emoji: "📺" },
  { id: "4", name: "Cases", count: "38 товаров", emoji: "📦" },
  { id: "5", name: "DIY Kits", count: "15 товаров", emoji: "🔧" },
  { id: "6", name: "Accessories", count: "112 товаров", emoji: "🔌" },
];

// ─── PRODUCTS DATA ─────────────────────────────────────────────────────────
export const PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Raspberry Pi 5 (8GB)",
    price: "$80.00",
    rating: 4.9,
    reviews: 128,
    badge: "New",
    description: "64-bit quad-core Arm Cortex-A76 at 2.4GHz.",
    longDescription:
      "The Raspberry Pi 5 builds upon the phenomenal success of the Raspberry Pi 4. Featuring a 64-bit quad-core Arm Cortex-A76 processor running at 2.4GHz, Raspberry Pi 5 delivers a 2–3× increase in CPU performance relative to Raspberry Pi 4. Alongside a substantial uplift in graphics performance from an 800MHz VideoCore VII GPU; dual 4Kp60 display output over HDMI; and state-of-the-art camera support from a rearchitected Raspberry Pi Image Signal Processor, it provides a smooth desktop experience for consumers, and opens the door to new applications for industrial customers.",
    specs: ["8GB LPDDR4X", "2.4GHz Quad-Core", "PCIe 2.0", "Dual 4Kp60 HDMI"],
    inStock: true,
    features: [
      "2.4GHz quad-core 64-bit Arm Cortex-A76 CPU",
      "VideoCore VII GPU, supporting OpenGL ES 3.1, Vulkan 1.2",
      "Dual 4Kp60 HDMI display output with HDR support",
      "4Kp60 HEVC decoder",
      "LPDDR4X-4267 SDRAM",
      "Dual-band 802.11ac Wi-Fi",
      "Bluetooth 5.0 / Bluetooth Low Energy (BLE)",
    ],
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "2",
    name: "8BitDo Ultimate Bluetooth",
    price: "$69.99",
    rating: 4.8,
    reviews: 342,
    badge: null,
    description:
      "Pro-level retro controller with dock. Compatible with Switch and Windows. Features Hall Effect joysticks.",
    longDescription:
      "The 8BitDo Ultimate Bluetooth Controller is designed with respect for the classics. We paid extra attention to the most critical characteristics like the D-pad, to make sure it feels exactly like you remember it. It features Hall Effect sensing joysticks, which are immune to stick drift. The included charging dock automatically turns the controller on and off when docked/undocked.",
    specs: ["Hall Effect Sticks", "Charging Dock", "2.4g / Bluetooth"],
    inStock: true,
    features: [
      "Bluetooth and 2.4g connectivity",
      "Charging Dock included",
      "Hall Effect Sensing Joysticks",
      "Custom Profile Switch button, 3 profiles, switch on the fly",
      "Ultimate Software on PC and mobile (Android/iOS)",
      "Motion controls (for Switch only)",
    ],
    image:
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1592840062464-79faec3e0856?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "3",
    name: "Argon ONE V3 Case",
    price: "$30.00",
    rating: 4.7,
    reviews: 89,
    badge: "Best Seller",
    description: "Premium aluminum cooling for Pi 5. Features an active cooling fan and built-in power button.",
    longDescription:
      "The Argon ONE V3 Case for Raspberry Pi 5 is the ultimate enclosure for your new board. Made from aluminum alloy, it acts as a massive passive heatsink, while the software-controllable 30mm blower fan provides active cooling when needed. It reroutes all ports to the back of the case for a clean, desktop-like appearance.",
    specs: ["Aluminum Alloy", "Active Cooling", "Full HDMI"],
    inStock: true,
    features: [
      "Sleek aluminum alloy housing",
      "Passive and active cooling system",
      "All ports redirected to the rear",
      "Built-in power button for safe shutdown",
      "Magnetic removable top for GPIO access",
      "Full-size HDMI ports",
    ],
    image:
      "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "4",
    name: "8BitDo SN30 Pro",
    price: "$44.99",
    rating: 4.6,
    reviews: 215,
    badge: null,
    description:
      "Classic design, modern features. A fully featured retro controller with rumble vibration and motion controls.",
    longDescription:
      "The SN30 Pro is the world's first, fully featured retro controller. It boasts a full button set with clickable joysticks, rumble vibration, motion controls, wireless bluetooth, rechargeable battery, home and screen shot buttons, and a USB-C connector. Not to mention a proper D-pad.",
    specs: ["Rumble Vibration", "Motion Controls", "USB-C"],
    inStock: true,
    features: [
      "Full button set with clickable joysticks",
      "Rumble vibration and motion controls",
      "Wireless Bluetooth connectivity",
      "Rechargeable battery",
      "USB-C connector",
      "Compatible with Switch, PC, macOS, Android, Steam, and Raspberry Pi",
    ],
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1531525645387-7f14be1bfc3d?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "5",
    name: 'Official 7" Touch Display',
    price: "$65.00",
    rating: 4.5,
    reviews: 64,
    badge: null,
    description:
      "Capacitive touch screen for Pi. Create interactive projects such as tablets or infotainment systems.",
    longDescription:
      "The 7\" Touchscreen Monitor for Raspberry Pi gives users the ability to create all-in-one, integrated projects such as tablets, infotainment systems and embedded designs. The 800 x 480 display connects via an adapter board which handles power and signal conversion.",
    specs: ["800x480 Resolution", "10-Finger Touch", "DSI Interface"],
    inStock: false,
    features: [
      "800 x 480 resolution at 60fps",
      "10-finger capacitive touch",
      "Connects to the Raspberry Pi DSI port",
      "Powered via the GPIO port",
      "Viewing angle: 70 degrees",
      "Dimensions: 194mm x 110mm x 20mm",
    ],
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&q=80&w=800",
    ],
  },
  {
    id: "6",
    name: "Retro Arcade Kit",
    price: "$120.00",
    rating: 4.9,
    reviews: 42,
    badge: null,
    description:
      "Everything you need to play. Includes a high-quality joystick, 8 arcade buttons, and USB encoder.",
    longDescription:
      "Build your own arcade machine with this comprehensive DIY kit. It includes a professional-grade Sanwa-style joystick with a restrictor gate, 8 responsive arcade buttons with microswitches, and a zero-delay USB encoder board.",
    specs: ["Sanwa-style Parts", "Zero-delay USB", "Plug & Play"],
    inStock: true,
    features: [
      "High-quality Sanwa-style joystick",
      "8 responsive arcade buttons",
      "Zero-delay USB encoder board",
      "Complete wiring harness included",
      "Plug and play on PC and Raspberry Pi",
      "Perfect for RetroPie and MAME",
    ],
    image:
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1551609355-667cb3d4b655?auto=format&fit=crop&q=80&w=800",
    ],
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}
