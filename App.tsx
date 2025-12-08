
import React, { useState, useMemo } from 'react';
import { AppProvider, useApp } from './store/AppContext';
import { Navbar } from './components/Navbar';
import { AdminPanel } from './components/AdminPanel';
import { CheckoutModal } from './components/CheckoutModal';
import { AboutModal } from './components/AboutModal';
import { ProductCard } from './components/ProductCard';
import { ProductSkeleton } from './components/ProductSkeleton';
import { Plus, Info, CreditCard, Gift, ArrowUpDown } from 'lucide-react';
import { TranslationKey } from './translations';

type SortOption = 'default' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';

const StoreContent: React.FC = () => {
  const { products, addToCart, isAdmin, isLoading, t } = useApp();
  const [showCart, setShowCart] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('default');

  // Helper to translate category if it exists in translation map, otherwise return as is
  const getCategoryName = (cat: string) => {
    // Check if the category string matches a translation key (e.g., 'cat_Digital')
    if (cat.startsWith('cat_')) {
        return t(cat as TranslationKey);
    }
    return cat;
  };

  // Sort Logic
  const sortedProducts = useMemo(() => {
    // Create a shallow copy to sort
    const items = [...products];
    switch (sortOption) {
      case 'price_asc':
        return items.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return items.sort((a, b) => b.price - a.price);
      case 'name_asc':
        return items.sort((a, b) => a.name.localeCompare(b.name));
      case 'name_desc':
        return items.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return items;
    }
  }, [products, sortOption]);

  return (
    <div className="min-h-screen bg-zinc-950 pb-24">
      <Navbar onOpenCart={() => setShowCart(true)} onOpenAbout={() => setShowAbout(true)} />

      {/* Guide / Welcome Banner */}
      <div className="px-4 pt-6 pb-2">
        <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800 shadow-lg">
            {/* Header */}
            <h3 className="text-white font-bold mb-3 flex items-center gap-2 border-b border-zinc-800 pb-2">
                <Info size={16} className="text-emerald-400" /> {t('guideTitle')}
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {/* How to Buy */}
                <div className="flex gap-3 items-start">
                    <div className="p-2 bg-blue-500/10 rounded-lg shrink-0">
                        <CreditCard size={18} className="text-blue-400" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-zinc-200 mb-1">{t('howToBuy')}</h4>
                        <p className="text-[10px] text-zinc-400 leading-tight">
                            {t('howToBuyDesc')}
                        </p>
                    </div>
                </div>

                {/* Delivery Method */}
                <div className="flex gap-3 items-start">
                    <div className="p-2 bg-purple-500/10 rounded-lg shrink-0">
                        <Gift size={18} className="text-purple-400" />
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-zinc-200 mb-1">{t('deliveryMethod')}</h4>
                        <p className="text-[10px] text-zinc-400 leading-tight">
                            {t('deliveryMethodDesc')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Admin Ad Link Area */}
            <a href="#" className="block w-full bg-zinc-950/50 py-2 rounded text-center text-xs font-mono text-emerald-500 hover:text-emerald-400 border border-emerald-900/30 border-dashed transition-colors">
                {t('adText')}
            </a>
        </div>
      </div>

      {/* Product Grid Header with Sort */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">{t('newArrivals')}</h2>
            
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none text-zinc-400">
                    <ArrowUpDown size={14} />
                </div>
                <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-lg block pl-8 pr-2 py-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none appearance-none cursor-pointer hover:border-zinc-700 transition-colors"
                >
                    <option value="default">{t('sortDefault')}</option>
                    <option value="price_asc">{t('sortPriceAsc')}</option>
                    <option value="price_desc">{t('sortPriceDesc')}</option>
                    <option value="name_asc">{t('sortNameAsc')}</option>
                    <option value="name_desc">{t('sortNameDesc')}</option>
                </select>
            </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {isLoading ? (
            // Render 6 skeletons while loading
            Array.from({ length: 6 }).map((_, index) => (
              <ProductSkeleton key={index} />
            ))
          ) : (
            sortedProducts.map((product) => (
              <ProductCard 
                  key={product.id} 
                  product={product} 
                  addToCart={addToCart} 
                  getCategoryName={getCategoryName}
                  t={t}
              />
            ))
          )}
        </div>
      </div>

      {/* Admin Floating Action Button */}
      {isAdmin && !isLoading && (
        <button
          onClick={() => setShowAdmin(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-emerald-600 rounded-full shadow-2xl shadow-emerald-900/50 flex items-center justify-center text-white z-30 hover:scale-105 transition-transform"
        >
          <Plus size={28} />
        </button>
      )}

      {/* Modals */}
      {showAdmin && <AdminPanel onClose={() => setShowAdmin(false)} />}
      {showCart && <CheckoutModal onClose={() => setShowCart(false)} />}
      {showAbout && <AboutModal onClose={() => setShowAbout(false)} />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <StoreContent />
    </AppProvider>
  );
};

export default App;