
import React from 'react';
import { useApp } from '../store/AppContext';
import { ShoppingBag, ShieldCheck, Languages, HelpCircle } from 'lucide-react';

export const Navbar: React.FC<{ onOpenCart: () => void; onOpenAbout: () => void }> = ({ onOpenCart, onOpenAbout }) => {
  const { user, isAdmin, cart, toggleDemoAdmin, t, language, setLanguage } = useApp();

  const toggleLang = () => {
    setLanguage(language === 'zh' ? 'ko' : 'zh');
    if (window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
    }
  };

  return (
    <div className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-4xl mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* Brand / User Info */}
        <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                {user ? (user.first_name[0] || 'U') : '缺'}
            </div>
            <div className="flex flex-col">
                <h1 className="text-sm font-bold text-white leading-none">{t('appName')}</h1>
                <div className="text-[10px] text-zinc-400 flex items-center gap-1">
                    {isAdmin ? (
                        <span className="text-emerald-400 flex items-center gap-1">
                            <ShieldCheck size={10} /> {t('adminRole')}
                        </span>
                    ) : (
                        <span onClick={toggleDemoAdmin} className="cursor-pointer">
                            {user ? `@${user.username || t('userRole')}` : t('guestRole')}
                        </span>
                    )}
                </div>
            </div>
        </div>

        <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <button 
                onClick={toggleLang}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-300 hover:text-white transition-colors"
            >
                <Languages size={14} />
                {language === 'zh' ? 'CN' : 'KR'}
            </button>
            
            {/* About Button */}
            <button 
                onClick={onOpenAbout}
                className="p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors border border-zinc-800 text-zinc-400 hover:text-white"
            >
                <HelpCircle size={20} />
            </button>

            {/* Cart Button */}
            <button 
                onClick={onOpenCart}
                className="relative p-2 bg-zinc-900 rounded-full hover:bg-zinc-800 transition-colors border border-zinc-800"
            >
                <ShoppingBag size={20} className="text-white" />
                {cart.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                        {cart.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                )}
            </button>
        </div>
      </div>
    </div>
  );
};
