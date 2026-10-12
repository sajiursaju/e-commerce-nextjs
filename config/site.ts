export const siteConfig = {
    name: "MyStore",
    announcement: "Free delivery on orders over $50 · 7-day easy returns",
  };
  
  // One list used everywhere: header, menu, search, admin form, filtering
  export const productCategories = [
    { label: "Women's & Girls' Fashion", value: "womens-fashion" },
    { label: "Men's & Boys' Fashion", value: "mens-fashion" },
    { label: "Electronic Accessories", value: "electronic-accessories" },
    { label: "TV & Home Appliances", value: "tv-home-appliances" },
    { label: "Electronics Device", value: "electronic-devices" },
    { label: "Mother & Baby", value: "mother-baby" },
    { label: "Automotive & Motorbike", value: "automotive-motorbike" },
    { label: "Sports & Outdoors", value: "sports-outdoors" },
    { label: "Home & Lifestyle", value: "home-lifestyle" },
    { label: "Groceries", value: "groceries" },
    { label: "Health & Beauty", value: "health-beauty" },
    { label: "Watches, Bags, Jewellery", value: "watches-bags-jewellery" },
  ];
  
  export const categories = [
    { label: "All Products", href: "/products" },
    ...productCategories.map((c) => ({
      label: c.label,
      href: `/products?category=${c.value}`,
    })),
  ];
  
  export const searchCategories = [{ label: "All", value: "" }, ...productCategories];
  
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