import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 199.99,
    description: "Experience premium sound quality with these wireless headphones featuring noise cancellation, 30-hour battery life, and comfortable over-ear design.",
    image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "electronics",
    rating: 4.8,
    stock: 15,
    featured: true
  },
  {
    id: 2,
    name: "Ultra HD Smart TV - 55\"",
    price: 699.99,
    description: "Immerse yourself in stunning 4K resolution with this 55-inch smart TV. Features HDR, built-in streaming apps, and voice control.",
    image: "https://images.pexels.com/photos/1201996/pexels-photo-1201996.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "electronics",
    rating: 4.6,
    stock: 8
  },
  {
    id: 3,
    name: "Professional Camera Kit",
    price: 1299.99,
    description: "Capture stunning photos and videos with this professional-grade camera kit. Includes 24MP sensor, 4K video recording, and 3 premium lenses.",
    image: "https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "electronics",
    rating: 4.9,
    stock: 5,
    featured: true
  },
  {
    id: 4,
    name: "Ergonomic Office Chair",
    price: 249.99,
    description: "Work in comfort with this ergonomic office chair featuring lumbar support, adjustable height, and breathable mesh material.",
    image: "https://images.pexels.com/photos/1957478/pexels-photo-1957478.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "furniture",
    rating: 4.5,
    stock: 12
  },
  {
    id: 5,
    name: "Minimalist Desk Lamp",
    price: 59.99,
    description: "Add style and functionality to your workspace with this minimalist desk lamp. Features adjustable brightness and color temperature.",
    image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "furniture",
    rating: 4.3,
    stock: 20
  },
  {
    id: 6,
    name: "Premium Coffee Maker",
    price: 129.99,
    description: "Brew perfect coffee every time with this premium coffee maker. Features programmable settings, thermal carafe, and built-in grinder.",
    image: "https://images.pexels.com/photos/6542322/pexels-photo-6542322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "kitchen",
    rating: 4.7,
    stock: 10
  },
  {
    id: 7,
    name: "Wireless Earbuds",
    price: 89.99,
    description: "Experience wireless freedom with these premium earbuds featuring noise isolation, touch controls, and 24-hour battery life with charging case.",
    image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "electronics",
    rating: 4.4,
    stock: 25
  },
  {
    id: 8,
    name: "Smart Fitness Watch",
    price: 149.99,
    description: "Track your fitness goals with this smart watch. Features heart rate monitoring, GPS, sleep tracking, and 7-day battery life.",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "electronics",
    rating: 4.5,
    stock: 18,
    featured: true
  },
  {
    id: 9,
    name: "Leather Messenger Bag",
    price: 79.99,
    description: "Carry your essentials in style with this genuine leather messenger bag featuring multiple compartments and adjustable strap.",
    image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "fashion",
    rating: 4.2,
    stock: 15
  },
  {
    id: 10,
    name: "Portable Bluetooth Speaker",
    price: 69.99,
    description: "Take your music anywhere with this waterproof portable speaker. Features 12-hour battery life, impressive sound, and compact design.",
    image: "https://images.pexels.com/photos/1279107/pexels-photo-1279107.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "electronics",
    rating: 4.3,
    stock: 22
  },
  {
    id: 11,
    name: "Premium Yoga Mat",
    price: 45.99,
    description: "Enhance your yoga practice with this premium non-slip mat featuring eco-friendly materials and perfect cushioning.",
    image: "https://images.pexels.com/photos/4498155/pexels-photo-4498155.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "fitness",
    rating: 4.6,
    stock: 30
  },
  {
    id: 12,
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    description: "Stay hydrated in style with this vacuum-insulated water bottle that keeps drinks cold for 24 hours or hot for 12 hours.",
    image: "https://images.pexels.com/photos/1188649/pexels-photo-1188649.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    category: "lifestyle",
    rating: 4.4,
    stock: 40
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getCategories = (): string[] => {
  const categories = new Set(products.map(product => product.category));
  return Array.from(categories);
};