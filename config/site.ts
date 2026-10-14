export type Category = {
  label: string;
  value: string;
  children?: Category[];
};

// Old names, kept so existing imports keep working
export type SubCategory = Category;
export type ProductCategory = Category;

export const siteConfig = {
  name: "MyStore",
  announcement: "Free delivery on orders over $50 · 7-day easy returns",
};

// One tree used everywhere: header menu, mobile menu, search, shop filter,
// admin product form. Up to 3 levels. Every `value` must be unique, and once
// products use a value, don't rename it (labels are safe to change).
export const productCategories: Category[] = [
  {
    label: "Women's & Girls' Fashion",
    value: "womens-fashion",
    children: [
      {
        label: "Clothing",
        value: "women-clothing",
        children: [
          { label: "Dresses", value: "womens-dresses" },
          { label: "Tops & Tees", value: "womens-tops" },
          { label: "Lingerie Sets", value: "women-lingerie-sets" },
          { label: "Kaftans", value: "women-kaftans" },
          { label: "Shrugs", value: "women-shrugs" },
          { label: "Shalwar Kameez & Ethnic", value: "women-shalwar-kameez" },
          { label: "Unstitched Fabric", value: "women-unstitched-fabric" },
          { label: "Blouses", value: "women-blouses" },
        ],
      },
      { label: "Bags", value: "womens-bags" },
      {
        label: "Footwear",
        value: "women-footwear",
        children: [
          { label: "Heels", value: "women-heels" },
          { label: "Flats", value: "women-flats" },
          { label: "Sandals", value: "women-sandals" },
        ],
      },
      { label: "Girls' Wear", value: "girls-wear" },
    ],
  },
  {
    label: "Men's & Boys' Fashion",
    value: "mens-fashion",
    children: [
      {
        label: "Clothing",
        value: "men-clothing",
        children: [
          { label: "Shirts", value: "mens-shirts" },
          { label: "Pants & Jeans", value: "mens-pants" },
          { label: "T-Shirts & Polos", value: "men-tshirts-polos" },
          { label: "Panjabi & Kurta", value: "men-panjabi-kurta" },
        ],
      },
      {
        label: "Shoes",
        value: "mens-shoes",
        children: [
          { label: "Sneakers", value: "men-sneakers" },
          { label: "Formal Shoes", value: "men-formal-shoes" },
          { label: "Sandals & Slippers", value: "men-sandals" },
        ],
      },
      { label: "Boys' Wear", value: "boys-wear" },
    ],
  },
  {
    label: "Electronic Accessories",
    value: "electronic-accessories",
    children: [
      {
        label: "Mobile Accessories",
        value: "mobile-accessories",
        children: [
          { label: "Phone Cases", value: "phone-cases" },
          { label: "Chargers & Cables", value: "chargers-cables" },
          { label: "Power Banks", value: "power-banks" },
        ],
      },
      {
        label: "Audio",
        value: "audio",
        children: [
          { label: "Headphones", value: "headphones" },
          { label: "Earbuds", value: "earbuds" },
          { label: "Speakers", value: "speakers" },
        ],
      },
      {
        label: "Computer Accessories",
        value: "computer-accessories",
        children: [
          { label: "Keyboards & Mice", value: "keyboards-mice" },
          { label: "Pen Drives & Storage", value: "pen-drives-storage" },
        ],
      },
    ],
  },
  {
    label: "TV & Home Appliances",
    value: "tv-home-appliances",
    children: [
      { label: "Televisions", value: "televisions" },
      {
        label: "Kitchen Appliances",
        value: "kitchen-appliances",
        children: [
          { label: "Blenders & Juicers", value: "blenders-juicers" },
          { label: "Rice Cookers", value: "rice-cookers" },
          { label: "Microwave Ovens", value: "microwave-ovens" },
        ],
      },
      {
        label: "Cooling & Heating",
        value: "cooling-heating",
        children: [
          { label: "Fans", value: "fans" },
          { label: "Air Conditioners", value: "air-conditioners" },
        ],
      },
      { label: "Refrigerators", value: "refrigerators" },
      { label: "Washing Machines", value: "washing-machines" },
    ],
  },
  {
    label: "Electronics Device",
    value: "electronic-devices",
    children: [
      { label: "Mobiles", value: "mobiles" },
      { label: "Laptops", value: "laptops" },
      { label: "Cameras", value: "cameras" },
      { label: "Tablets", value: "tablets" },
      { label: "Smart Watches", value: "smart-watches" },
      { label: "Gaming Consoles", value: "gaming-consoles" },
    ],
  },
  {
    label: "Mother & Baby",
    value: "mother-baby",
    children: [
      { label: "Baby Clothing", value: "baby-clothing" },
      { label: "Diapers & Wipes", value: "diapers-wipes" },
      { label: "Baby Feeding", value: "baby-feeding" },
      { label: "Toys & Games", value: "toys-games" },
      { label: "Baby Gear", value: "baby-gear" },
    ],
  },
  {
    label: "Automotive & Motorbike",
    value: "automotive-motorbike",
    children: [
      { label: "Car Accessories", value: "car-accessories" },
      {
        label: "Motorbike Accessories",
        value: "motorbike-accessories",
        children: [
          { label: "Helmets", value: "helmets" },
          { label: "Riding Gear", value: "riding-gear" },
        ],
      },
      { label: "Oils & Lubricants", value: "oils-lubricants" },
    ],
  },
  {
    label: "Sports & Outdoors",
    value: "sports-outdoors",
    children: [
      { label: "Fitness Equipment", value: "fitness-equipment" },
      { label: "Outdoor & Camping", value: "outdoor-camping" },
      {
        label: "Team Sports",
        value: "team-sports",
        children: [
          { label: "Cricket", value: "cricket" },
          { label: "Football", value: "football" },
        ],
      },
    ],
  },
  {
    label: "Home & Lifestyle",
    value: "home-lifestyle",
    children: [
      { label: "Furniture", value: "furniture" },
      { label: "Home Decor", value: "home-decor" },
      { label: "Bedding", value: "bedding" },
      { label: "Kitchen & Dining", value: "kitchen-dining" },
      { label: "Lighting", value: "lighting" },
    ],
  },
  {
    label: "Groceries",
    value: "groceries",
    children: [
      { label: "Rice, Flour & Oil", value: "rice-flour-oil" },
      { label: "Spices", value: "spices" },
      { label: "Beverages", value: "beverages" },
      { label: "Snacks", value: "snacks" },
    ],
  },
  {
    label: "Health & Beauty",
    value: "health-beauty",
    children: [
      { label: "Skincare", value: "skincare" },
      { label: "Makeup", value: "makeup" },
      { label: "Hair Care", value: "hair-care" },
      { label: "Personal Care", value: "personal-care" },
      { label: "Fragrances", value: "fragrances" },
    ],
  },
  {
    label: "Watches, Bags, Jewellery",
    value: "watches-bags-jewellery",
    children: [
      {
        label: "Watches",
        value: "watches",
        children: [
          { label: "Men's Watches", value: "mens-watches" },
          { label: "Women's Watches", value: "womens-watches" },
        ],
      },
      {
        label: "Bags",
        value: "bags",
        children: [
          { label: "Handbags", value: "handbags" },
          { label: "Backpacks", value: "backpacks" },
          { label: "Travel Luggage", value: "travel-luggage" },
        ],
      },
      {
        label: "Jewellery",
        value: "jewellery",
        children: [
          { label: "Necklaces", value: "necklaces" },
          { label: "Earrings", value: "earrings" },
          { label: "Rings", value: "rings" },
        ],
      },
    ],
  },
];

// Every valid slug at every level, used for validation
function collectValues(list: Category[]): string[] {
  return list.flatMap((c) => [c.value, ...collectValues(c.children ?? [])]);
}
export const allCategoryValues: string[] = collectValues(productCategories);

// Link tree for older code that reads `categories`
export type NavLink = { label: string; href: string; children?: NavLink[] };

function toLinks(list: Category[]): NavLink[] {
  return list.map((c) => ({
    label: c.label,
    href: `/products?category=${c.value}`,
    children: c.children?.length ? toLinks(c.children) : undefined,
  }));
}

export const categories: NavLink[] = [
  { label: "All Products", href: "/products" },
  ...toLinks(productCategories),
];

// Search bar dropdown: top-level categories only
export const searchCategories = [
  { label: "All", value: "" },
  ...productCategories.map((c) => ({ label: c.label, value: c.value })),
];

export const quickLinks = [
  { label: "Home", href: "/" },
  { label: "My Cart", href: "/cart" },
  { label: "My Orders", href: "/orders" },
  { label: "My Account", href: "/account" },
];

export const heroSlides = [
  {
    title: "Big Sale on Electronics",
    subtitle: "Up to 40% off top gadgets this week",
    cta: "Shop now",
    href: "/products?category=electronic-devices",
    gradient: "from-indigo-600 to-violet-500",
    image: "",
  },
  {
    title: "New Fashion Arrivals",
    subtitle: "Fresh styles for every season",
    cta: "Explore",
    href: "/products?category=womens-fashion",
    gradient: "from-rose-500 to-orange-400",
    image: "",
  },
  {
    title: "Free Delivery Over $50",
    subtitle: "Plus 7-day easy returns",
    cta: "Start shopping",
    href: "/products",
    gradient: "from-emerald-600 to-teal-500",
    image: "",
  },
];