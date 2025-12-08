
import React, { useState, useRef } from 'react';
import { useApp } from '../store/AppContext';
import { Plus, X, Upload, Package } from 'lucide-react';
import { Product } from '../types';

export const AdminPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { addProduct, t } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    imageUrl: 'https://picsum.photos/400/400?random=10'
  });

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now().toString(),
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      imageUrl: previewUrl || formData.imageUrl,
      category: 'cat_General'
    };
    addProduct(newProduct);
    onClose();
    
    if (window.Telegram?.WebApp) {
       window.Telegram.WebApp.showAlert(`${t('productAdded')} (${newProduct.name})`);
    } else {
       alert(t('productAdded'));
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 500 * 1024 * 1024) {
        alert(t('fileTooLarge'));
        return;
      }
      
      // Create a fake local URL for preview
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="max-w-lg mx-auto bg-zinc-900 rounded-xl border border-zinc-800 p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-emerald-400">
             <Package size={24} />
             <h2 className="text-xl font-bold text-white">{t('adminDashboard')}</h2>
          </div>
          <button onClick={onClose} className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Image Upload Area */}
          <div 
            className="w-full h-40 border-2 border-dashed border-zinc-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition-colors bg-zinc-900/50"
            onClick={() => fileInputRef.current?.click()}
          >
            {previewUrl ? (
              <img src={previewUrl} alt="Preview" className="h-full w-full object-cover rounded-lg" />
            ) : (
              <div className="text-zinc-500 flex flex-col items-center">
                <Upload size={32} className="mb-2" />
                <span className="text-sm">{t('clickToUpload')}</span>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">{t('prodName')}</label>
            <input 
              required
              type="text" 
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              placeholder="e.g. USDT Gift Card"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">{t('prodPrice')}</label>
            <input 
              required
              type="number" 
              step="0.01"
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              value={formData.price}
              onChange={e => setFormData({...formData, price: e.target.value})}
              placeholder="0.00"
            />
          </div>

          <div>
            <label className="block text-sm text-zinc-400 mb-1">{t('prodDesc')}</label>
            <textarea 
              required
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500 h-24"
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
              placeholder="..."
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 mt-4"
          >
            <Plus size={20} />
            {t('addProduct')}
          </button>
        </form>
      </div>
    </div>
  );
};
