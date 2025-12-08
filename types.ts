
export interface Product {
  id: string;
  name: string;
  price: number; // In USDT
  stock: number;
  description: string;
  imageUrl: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

export type Language = 'zh' | 'ko';

// Admin ID from your request
export const ADMIN_ID = 7935557847;

export const ADMIN_WALLET_ADDRESS = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"; // Example USDT-TRC20 Address

declare global {
  interface Window {
    Telegram?: {
      WebApp: {
        ready: () => void;
        expand: () => void;
        initDataUnsafe?: {
          user?: TelegramUser;
        };
        HapticFeedback?: {
          impactOccurred: (style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft') => void;
          notificationOccurred: (type: 'error' | 'success' | 'warning') => void;
        };
        close: () => void;
        sendData: (data: string) => void;
        showAlert: (message: string) => void;
        openTelegramLink: (url: string) => void;
      };
    };
  }
}
