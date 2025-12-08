
import React, { useState } from 'react';
import { useApp } from '../store/AppContext';
import { X, Copy, CheckCircle, Wallet, AlertCircle, ClipboardPaste, Loader2 } from 'lucide-react';
import { ADMIN_WALLET_ADDRESS } from '../types';

export const CheckoutModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const { cart, totalPrice, clearCart, decrementStock, t } = useApp();
  const [step, setStep] = useState<'cart' | 'payment'>('cart');
  const [copied, setCopied] = useState(false);
  const [txId, setTxId] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ADMIN_WALLET_ADDRESS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    if(window.Telegram?.WebApp?.HapticFeedback) {
        window.Telegram.WebApp.HapticFeedback.notificationOccurred('success');
    }
  };

  const handlePaste = async () => {
    try {
        const text = await navigator.clipboard.readText();
        if (text) {
            setTxId(text.trim());
            setError('');
            if(window.Telegram?.WebApp?.HapticFeedback) {
                window.Telegram.WebApp.HapticFeedback.impactOccurred('light');
            }
        }
    } catch (err) {
        // Fallback or ignore if permission denied
        console.error('Failed to read clipboard', err);
    }
  };

  const handleConfirmPayment = () => {
    // Validation
    if (!txId.trim() || txId.length < 20) {
        setError(t('txIdRequired'));
        if(window.Telegram?.WebApp?.HapticFeedback) {
            window.Telegram.WebApp.HapticFeedback.notificationOccurred('error');
        }
        return;
    }

    setIsSubmitting(true);

    // Simulate network request duration
    setTimeout(() => {
        const payload = {
            action: 'payment_submitted',
            amount: totalPrice,
            currency: 'USDT',
            network: 'TRC20',
            items: cart.map(i => ({ id: i.id, name: i.name, quantity: i.quantity })),
            txId: txId.trim(),
            timestamp: Date.now()
        };

        // Update local stock for demo purposes
        decrementStock(cart);

        if(window.Telegram?.WebApp) {
            window.Telegram.WebApp.sendData(JSON.stringify(payload));
            window.Telegram.WebApp.showAlert(t('paymentConfirmed'));
            window.Telegram.WebApp.close();
        } else {
            console.log("Mock Payload:", payload);
            alert(`${t('paymentAlert')}\nTxID: ${txId}`);
            clearCart();
            onClose();
        }
        setIsSubmitting(false);
    }, 1500);
  };

  if (cart.length === 0) {
    onClose();
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
      <div className="bg-zinc-900 w-full max-w-md rounded-t-2xl sm:rounded-2xl border-t sm:border border-zinc-800 p-6 animate-in slide-in-from-bottom-10 max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">
            {step === 'cart' ? t('yourCart') : t('checkoutTitle')}
          </h2>
          <button 
            onClick={onClose} 
            disabled={isSubmitting}
            className="p-2 bg-zinc-800 rounded-full hover:bg-zinc-700 text-white disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        {step === 'cart' ? (
          <>
            <div className="max-h-[50vh] overflow-y-auto space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between items-center bg-zinc-800/50 p-3 rounded-lg">
                  <div className="flex items-center gap-3">
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded object-cover" />
                    <div>
                      <div className="text-sm font-medium text-white">{item.name}</div>
                      <div className="text-xs text-zinc-400">{item.quantity} x {item.price} USDT</div>
                    </div>
                  </div>
                  <div className="text-emerald-400 font-bold">
                    {(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center py-4 border-t border-zinc-800 mb-4">
                <span className="text-zinc-400">{t('totalAmount')}</span>
                <span className="text-2xl font-bold text-emerald-400">{totalPrice.toFixed(2)} USDT</span>
            </div>

            <button 
              onClick={() => setStep('payment')}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-900/20 active:scale-95 transition-transform"
            >
              {t('proceedPayment')}
            </button>
          </>
        ) : (
          <div className="space-y-5 text-center">
            {/* Amount & QR Display */}
            <div className="bg-zinc-800 p-4 rounded-xl flex flex-col items-center border border-zinc-700">
               <p className="text-zinc-400 text-xs mb-1">{t('sendExactly')}</p>
               <p className="text-3xl font-bold text-emerald-400 mb-4">{totalPrice.toFixed(2)} USDT</p>
               <div className="w-32 h-32 bg-white p-2 rounded-lg mb-4">
                  <img 
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${ADMIN_WALLET_ADDRESS}`} 
                    alt="QR Code" 
                    className="w-full h-full"
                  />
               </div>
               <p className="text-[10px] text-zinc-500 uppercase tracking-wider bg-zinc-900 px-2 py-1 rounded">{t('network')}</p>
            </div>

            {/* Address Copy Area */}
            <div className="text-left">
                <label className="text-xs text-zinc-500 ml-1 mb-1 block">{t('walletAddress')}</label>
                <div 
                    onClick={handleCopy}
                    className="bg-zinc-950 border border-zinc-800 p-3 rounded-xl flex items-center justify-between cursor-pointer active:scale-95 transition-all group hover:border-zinc-600"
                >
                    <span className="text-xs sm:text-sm font-mono text-zinc-300 truncate w-60 group-hover:text-white transition-colors">
                        {ADMIN_WALLET_ADDRESS}
                    </span>
                    {copied ? <CheckCircle size={18} className="text-emerald-500" /> : <Copy size={18} className="text-zinc-500 group-hover:text-white" />}
                </div>
            </div>

            {/* TxID Input Area with Paste Button */}
            <div className="text-left">
                <label className="text-xs text-emerald-500 font-bold ml-1 mb-1 flex items-center gap-1">
                   {t('txIdLabel')} <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <input 
                        type="text" 
                        value={txId}
                        onChange={(e) => {
                            setTxId(e.target.value);
                            setError('');
                        }}
                        disabled={isSubmitting}
                        placeholder={t('txIdPlaceholder')}
                        className={`w-full bg-zinc-950 border ${error ? 'border-red-500' : 'border-zinc-800 focus:border-emerald-500'} rounded-xl p-3 pr-12 text-white text-sm focus:outline-none transition-all disabled:opacity-50`}
                    />
                    <button 
                        onClick={handlePaste}
                        disabled={isSubmitting}
                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-zinc-500 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                        title={t('paste')}
                    >
                        <ClipboardPaste size={18} />
                    </button>
                </div>
                {error && (
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1 animate-pulse">
                        <AlertCircle size={12} /> {error}
                    </p>
                )}
            </div>

            {/* Action Button */}
            <button 
              onClick={handleConfirmPayment}
              disabled={isSubmitting || txId.length < 5}
              className={`w-full font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg ${
                  txId.length > 5 && !isSubmitting
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20 active:scale-95' 
                  : 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
              }`}
            >
              {isSubmitting ? (
                  <Loader2 size={20} className="animate-spin" />
              ) : (
                  <>
                    <Wallet size={20} />
                    {t('iHavePaid')}
                  </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
