import React, { useState } from 'react';
import {
  X,
  Heart,
  MessageCircle,
  Building2,
  ShieldCheck,
  Star,
  Tag,
  Clock,
  Eye,
  CheckCircle,
  Phone,
  Share2,
  BookmarkCheck,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { MarketplaceItem, User, SellerReview } from '../../types';

interface ItemDetailModalProps {
  item: MarketplaceItem | null;
  onClose: () => void;
  currentUser: User;
  onStartChat: (seller: User, item: MarketplaceItem) => void;
  onToggleWishlist: (itemId: string) => void;
  isWishlisted: boolean;
  onReserveItem: (itemId: string) => void;
  reviews: SellerReview[];
}

export const ItemDetailModal: React.FC<ItemDetailModalProps> = ({
  item,
  onClose,
  currentUser,
  onStartChat,
  onToggleWishlist,
  isWishlisted,
  onReserveItem,
  reviews
}) => {
  if (!item) return null;

  const [selectedImgIndex, setSelectedImgIndex] = useState(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const discountPercent = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0;

  const sellerReviews = reviews.filter(r => r.sellerId === item.sellerId);

  const handleReserve = () => {
    onReserveItem(item.id);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleCopyShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-900 max-h-[90vh] flex flex-col">
        
        {/* Modal Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white/90 sticky top-0 z-20">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span>Marketplace</span>
            <span>/</span>
            <span className="text-indigo-600 font-semibold">{item.category}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Image Gallery Column */}
            <div className="space-y-4">
              <div className="relative aspect-4/3 rounded-2xl bg-slate-50 overflow-hidden border border-slate-200">
                <img
                  src={item.images[selectedImgIndex] || item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />

                {item.status === 'Reserved' && (
                  <div className="absolute top-4 left-4 bg-amber-500 text-slate-900 text-xs font-bold px-3 py-1 rounded-full shadow">
                    RESERVED
                  </div>
                )}

                <button
                  onClick={() => onToggleWishlist(item.id)}
                  className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all ${
                    isWishlisted ? 'bg-rose-500 text-white shadow-lg' : 'bg-white/80 text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Thumbnail selector */}
              {item.images.length > 1 && (
                <div className="flex items-center gap-3">
                  {item.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImgIndex(idx)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImgIndex === idx ? 'border-indigo-600 scale-105' : 'border-slate-200 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Item Info Column */}
            <div className="space-y-5">
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="bg-indigo-600/10 text-indigo-600 border border-indigo-600/20 text-xs font-bold px-2.5 py-1 rounded-lg">
                    {item.condition}
                  </span>
                  {discountPercent > 0 && (
                    <span className="bg-rose-500/10 text-rose-400 border border-rose-500/30 text-xs font-bold px-2.5 py-1 rounded-lg">
                      Save {discountPercent}%
                    </span>
                  )}
                  <span className="text-xs text-slate-500 ml-auto flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {item.createdAt}
                  </span>
                </div>

                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">{item.title}</h1>
              </div>

              {/* Pricing card */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Asking Price</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-black text-indigo-600">₹{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-slate-500 line-through">₹{item.originalPrice}</span>
                    )}
                  </div>
                </div>

                {item.originalPrice && (
                  <div className="text-right">
                    <div className="text-[11px] text-slate-500">Total Savings</div>
                    <div className="text-sm font-bold text-rose-400">₹{item.originalPrice - item.price} OFF</div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-600 uppercase tracking-wider">Item Details</h3>
                <p className="text-sm text-slate-600 leading-relaxed bg-slate-100/40 p-4 rounded-2xl border border-slate-200">
                  {item.description}
                </p>
              </div>

              {/* Tags */}
              {item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[11px] bg-slate-100 text-slate-500 px-2.5 py-1 rounded-md border border-slate-300/60">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Action buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onStartChat(item.seller, item);
                  }}
                  className="w-full bg-indigo-600 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 transition-all hover:scale-[1.01]"
                >
                  <MessageCircle className="w-5 h-5" />
                  Chat Directly with Seller
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleReserve}
                    disabled={item.status === 'Reserved'}
                    className={`py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 border transition-all ${
                      item.status === 'Reserved'
                        ? 'bg-amber-500/20 text-amber-700 border-amber-500/30'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
                    }`}
                  >
                    <BookmarkCheck className="w-4 h-4 text-amber-500" />
                    {item.status === 'Reserved' ? 'Already Reserved' : 'Reserve / Offer'}
                  </button>

                  <button
                    onClick={handleCopyShare}
                    className="py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    {copiedLink ? <Check className="w-4 h-4 text-indigo-600" /> : <Share2 className="w-4 h-4" />}
                    {copiedLink ? 'Link Copied!' : 'Share Listing'}
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Seller Profile Card Section */}
          <div className="mt-8 pt-6 border-t border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-indigo-600" />
              Seller Hostel Profile
            </h3>

            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={item.seller.avatar}
                  alt={item.seller.name}
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-slate-300"
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 text-base">{item.seller.name}</span>
                    {item.seller.verifiedStudent && (
                      <span className="flex items-center gap-1 text-[10px] bg-indigo-600/10 text-indigo-600 border border-indigo-600/20 px-2 py-0.5 rounded-full font-semibold">
                        <ShieldCheck className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-500">
                    {item.seller.year} • {item.seller.department}
                  </p>
                  <p className="text-xs text-slate-500 font-medium">
                    ✉️ {item.seller.email}
                  </p>

                  <div className="flex items-center gap-3 text-xs text-slate-600 font-medium">
                    <span className="text-indigo-600">
                      📍 {item.seller.hostelBlock}, Room {item.seller.roomNumber}
                    </span>
                    <span className="flex items-center gap-1 text-slate-500">
                      <Phone className="w-3.5 h-3.5" />
                      {item.seller.phone}
                    </span>
                    <span className="text-amber-500 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      {item.seller.rating} ({item.seller.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {item.seller.badges.map(badge => (
                  <span key={badge} className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-300">
                    🏆 {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Seller Reviews Preview */}
            {sellerReviews.length > 0 && (
              <div className="mt-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Past Buyer Reviews</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sellerReviews.map(rev => (
                    <div key={rev.id} className="bg-slate-100/60 p-3 rounded-xl border border-slate-200 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between text-slate-600">
                        <span className="font-bold text-slate-900">{rev.reviewer.name}</span>
                        <span className="text-amber-500">★ {rev.rating}.0</span>
                      </div>
                      <p className="text-slate-500 italic">"{rev.comment}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
