
import React from 'react';
import { useApp } from '../store/AppContext';
import { X, Info, CreditCard, MessageCircle, Send } from 'lucide-react';

export const AboutModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { t } = useApp();

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 w-full max-w-md rounded-2xl border border-zinc-800 p-6 animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2 text-blue-400">
            <Info size={24} />
            <h2 className="text-xl font-bold text-white">{t('aboutTitle')}</h2>
          </div>
          <button onClick={onClose} className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* App Description */}
          <div className="space-y-2">
            <p className="text-zinc-300 text-sm leading-relaxed">
              {t('aboutDesc')}
            </p>
          </div>

          {/* Payment Info */}
          <div className="bg-zinc-800/50 p-4 rounded-xl border border-zinc-800">
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <CreditCard size={18} />
              <h3 className="font-bold text-sm">{t('paymentMethod')}</h3>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {t('paymentDetails')}
            </p>
          </div>

          {/* Contact Buttons */}
          <div>
            <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
               <MessageCircle size={16} className="text-purple-400"/> {t('contactUs')}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <a 
                href="#" // Replace with actual Telegram Channel Link
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 p-4 rounded-xl border border-zinc-700 transition-colors group"
              >
                <Send size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-zinc-300">{t('channelBtn')}</span>
              </a>
              
              <a 
                href="https://t.me/telegram" // Replace with actual Admin/Support Link
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center justify-center gap-2 bg-zinc-800 hover:bg-zinc-700 p-4 rounded-xl border border-zinc-700 transition-colors group"
              >
                <MessageCircle size={20} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-zinc-300">{t('supportBtn')}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-800 text-center">
             <span className="text-[10px] text-zinc-600 font-mono">v1.0.0 • 缺啥补啥</span>
        </div>
      </div>
    </div>
  );
};
