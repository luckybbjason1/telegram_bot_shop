
import React, { useState } from 'react';
import { Product } from '../types';
import { TranslationKey } from '../translations';
import { useApp } from '../store/AppContext';
import { Trash2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  addToCart: (product: Product) => void;
  getCategoryName: (category: string) => string;
  t: (key: TranslationKey) => string;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart, getCategoryName, t }) => {
  const { isAdmin, removeProduct } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);
  // Threshold to determine if description is considered "long" (approx > 2 lines)
  const showToggle = product.description.length > 50; 

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm(t('confirmDelete'))) {
        removeProduct(product.id);
        if(window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.notificationOccurred('warning');
        }
    }
  };

  return (
    <div className="bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 flex flex-col h-full shadow-lg transition-all duration-300 hover:border-zinc-700 relative group/card">
      <div className="relative h-40 overflow-hidden bg-zinc-800 group">
        <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-bold text-emerald-400 border border-emerald-500/30">
            {product.price} USDT
        </div>
        
        {/* Admin Delete Button - Only visible to admins */}
        {isAdmin && (
            <button 
                onClick={handleDelete}
                className="absolute top-2 left-2 bg-red-500/90 text-white p-1.5 rounded-lg shadow-lg hover:bg-red-600 transition-colors z-10"
                title={t('deleteProduct')}
            >
                <Trash2 size={14} />
            </button>
        )}
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <div className="text-xs text-zinc-500 mb-1">{getCategoryName(product.category)}</div>
        <h3 className="font-bold text-sm text-white mb-1 line-clamp-1">{product.name}</h3>
        
        <div className="mb-3 flex-grow">
             <p className={`text-[10px] text-zinc-400 leading-relaxed ${isExpanded ? '' : 'line-clamp-2'}`}>
                {product.description}
             </p>
             {showToggle && (
                 <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(!isExpanded);
                    }}
                    className="text-[10px] text-blue-400 hover:text-blue-300 mt-1 font-medium focus:outline-none transition-colors"
                 >
                    {isExpanded ? t('readLess') : t('readMore')}
                 </button>
             )}
        </div>
        
        <button 
          onClick={() => addToCart(product)}
          className="w-full bg-zinc-800 hover:bg-emerald-600 hover:text-white text-zinc-300 text-xs font-bold py-2 rounded-lg transition-colors border border-zinc-700 mt-auto active:scale-95 transform"
        >
          {t('addToCart')}
        </button>
      </div>
    </div>
  );
};
