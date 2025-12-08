
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, TelegramUser, ADMIN_ID, Language } from '../types';
import { translations, TranslationKey } from '../translations';

interface AppContextType {
  user: TelegramUser | null;
  isAdmin: boolean;
  products: Product[];
  cart: CartItem[];
  language: Language;
  isLoading: boolean;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
  addProduct: (product: Product) => void;
  removeProduct: (productId: string) => void;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  decrementStock: (purchasedItems: CartItem[]) => void;
  clearCart: () => void;
  totalPrice: number;
  toggleDemoAdmin: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Initial Dummy Data
const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium VPN Access',
    price: 10,
    stock: 50,
    description: '1 Month High-speed encrypted connection.',
    category: 'cat_Digital',
    imageUrl: 'https://picsum.photos/400/400?random=1'
  },
  {
    id: '2',
    name: 'Telegram Premium Gift',
    price: 5,
    stock: 10,
    description: '3 Month subscription gift code.',
    category: 'cat_Sub',
    imageUrl: 'https://picsum.photos/400/400?random=2'
  },
  {
    id: '3',
    name: 'Exclusive E-Book Bundle',
    price: 25,
    stock: 0, // Mock out of stock
    description: 'Collection of trading strategies.',
    category: 'cat_Edu',
    imageUrl: 'https://picsum.photos/400/400?random=3'
  }
];

export const AppProvider = ({ children }: { children?: ReactNode }) => {
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [products, setProducts] = useState<Product[]>([]); // Start empty for skeleton demo
  const [cart, setCart] = useState<CartItem[]>([]);
  const [language, setLanguage] = useState<Language>('zh');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for Telegram WebApp environment
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      
      const tgUser = window.Telegram.WebApp.initDataUnsafe?.user;
      if (tgUser) {
        setUser(tgUser);
        if (tgUser.id === ADMIN_ID) {
          setIsAdmin(true);
        }
        // Auto-detect language if user's TG language is korean
        if (tgUser.language_code === 'ko') {
            setLanguage('ko');
        }
      }
    }

    // Simulate API Fetch Delay
    const timer = setTimeout(() => {
        setProducts(INITIAL_PRODUCTS);
        setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  const toggleDemoAdmin = () => setIsAdmin(!isAdmin);

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const removeProduct = (productId: string) => {
    setProducts((prev) => prev.filter(p => p.id !== productId));
    // Also remove from cart if it exists there
    setCart((prev) => prev.filter(item => item.id !== productId));
  };

  const addToCart = (product: Product) => {
    // Check if stock is available
    if (product.stock <= 0) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      
      // If adding more exceeds stock, do nothing (or show alert)
      if (existing && existing.quantity >= product.stock) {
        if (window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.notificationOccurred('warning');
        }
        return prev;
      }

      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    
    if (window.Telegram?.WebApp?.HapticFeedback) {
      window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
  };

  const decrementStock = (purchasedItems: CartItem[]) => {
    // Using functional state update ensures we are working with the latest state
    // effectively handling "race conditions" within the React event loop.
    setProducts(currentProducts => {
        const purchaseMap = new Map(purchasedItems.map(i => [i.id, i.quantity]));

        return currentProducts.map(product => {
            if (purchaseMap.has(product.id)) {
                const deduction = purchaseMap.get(product.id)!;
                const newStock = Math.max(0, product.stock - deduction);
                return { ...product, stock: newStock };
            }
            return product;
        });
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Translation helper
  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAdmin,
        products,
        cart,
        language,
        isLoading,
        setLanguage,
        t,
        addProduct,
        removeProduct,
        addToCart,
        removeFromCart,
        decrementStock,
        clearCart,
        totalPrice,
        toggleDemoAdmin
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
