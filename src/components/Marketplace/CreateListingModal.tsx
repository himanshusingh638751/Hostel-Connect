import React, { useState } from 'react';
import { X, Upload, Sparkles, Image, Tag, DollarSign, Building2, AlertCircle } from 'lucide-react';
import { MarketplaceItem, ItemCategory, ItemCondition, User } from '../../types';
import { compressImage } from '../../utils';

interface CreateListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  onCreateListing: (newItem: Omit<MarketplaceItem, 'id' | 'createdAt' | 'viewsCount' | 'wishlistCount' | 'seller' | 'sellerId' | 'status'>) => void;
}

const CATEGORIES: ItemCategory[] = [
  'Textbooks & Notes',
  'Calculators & Tech',
  'Lab Equipment & Coats',
  'Furniture & Mattress',
  'Room Decor & Electronics',
  'Sports Gear',
  'Other'
];

const STOCK_IMAGE_PRESETS: Record<ItemCategory, string[]> = {
  'Textbooks & Notes': [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600'
  ],
  'Calculators & Tech': [
    'https://images.unsplash.com/photo-1611125832047-1d7ad1e8e48e?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&q=80&w=600'
  ],
  'Lab Equipment & Coats': [
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600',
    'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=600'
  ],
  'Furniture & Mattress': [
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=600'
  ],
  'Room Decor & Electronics': [
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600'
  ],
  'Sports Gear': [
    'https://images.unsplash.com/photo-1517649763962-0c623266010b?auto=format&fit=crop&q=80&w=600'
  ],
  'Other': [
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=600'
  ]
};

export const CreateListingModal: React.FC<CreateListingModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onCreateListing
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ItemCategory>('Calculators & Tech');
  const [condition, setCondition] = useState<ItemCondition>('Like New');
  const [price, setPrice] = useState<string>('');
  const [originalPrice, setOriginalPrice] = useState<string>('');
  const [description, setDescription] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [imageUrl, setImageUrl] = useState(STOCK_IMAGE_PRESETS['Calculators & Tech'][0]);
  const [error, setError] = useState('');

  const handleCategoryChange = (cat: ItemCategory) => {
    setCategory(cat);
    const presets = STOCK_IMAGE_PRESETS[cat] || STOCK_IMAGE_PRESETS['Other'];
    setImageUrl(presets[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a listing title.');
      return;
    }
    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setError('Please enter a valid price in ₹.');
      return;
    }
    if (!description.trim()) {
      setError('Please enter a brief item description.');
      return;
    }

    const parsedTags = tagsInput
      .split(',')
      .map(t => t.trim().replace(/^#/, ''))
      .filter(Boolean);

    onCreateListing({
      title: title.trim(),
      category,
      condition,
      price: Number(price),
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      description: description.trim(),
      images: [imageUrl || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=600'],
      tags: parsedTags.length > 0 ? parsedTags : [category, condition, currentUser.hostelBlock]
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden my-8 text-slate-900">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-white/90">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center">
              📦
            </span>
            <div>
              <h2 className="text-lg font-bold text-slate-900">List Used Item for Sale</h2>
              <p className="text-xs text-slate-500">Post directly to Hostel Connect Marketplace</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          {error && (
            <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 rounded-xl text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600">Listing Title *</label>
            <input
              type="text"
              placeholder="e.g. Casio FX-991EX Scientific Calculator / Mini Drafter Set"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-slate-100 border border-slate-300 text-sm text-slate-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-600/50"
            />
          </div>

          {/* Category & Condition */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">Category *</label>
              <select
                value={category}
                onChange={(e) => handleCategoryChange(e.target.value as ItemCategory)}
                className="w-full bg-slate-100 border border-slate-300 text-sm text-slate-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-600/50"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">Condition *</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as ItemCondition)}
                className="w-full bg-slate-100 border border-slate-300 text-sm text-slate-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-600/50"
              >
                <option value="Like New">Like New (Scratches free, barely used)</option>
                <option value="Good">Good (Working great, minor wear)</option>
                <option value="Fair">Fair (Usable, priced low)</option>
              </select>
            </div>
          </div>

          {/* Pricing */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">Your Asking Price (₹) *</label>
              <input
                type="number"
                placeholder="e.g. 850"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full bg-slate-100 border border-slate-300 text-sm text-slate-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-600/50"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600">Original Retail Price (₹) (Optional)</label>
              <input
                type="number"
                placeholder="e.g. 1800 (Shows discount %)"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
                className="w-full bg-slate-100 border border-slate-300 text-sm text-slate-900 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-600/50"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600">Description & Pickup Details *</label>
            <textarea
              rows={3}
              placeholder="Describe condition, reason for selling, accessories included, best time for room pickup..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-slate-100 border border-slate-300 text-sm text-slate-900 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600/50"
            />
          </div>

          {/* Photo Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600">Item Image</label>
            <div className="flex items-center gap-3">
              <div className="w-20 h-20 rounded-2xl bg-slate-50 overflow-hidden border border-slate-300 shrink-0">
                <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Paste Image URL or click upload"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="flex-1 bg-slate-100 border border-slate-300 text-xs text-slate-900 rounded-xl px-3 py-2"
                  />
                  <label className="shrink-0 flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 px-3 py-2 rounded-xl text-xs font-bold cursor-pointer transition-colors">
                    Upload
                    <input 
                      type="file" 
                      accept="image/*"
                      className="hidden" 
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          try {
                            const compressed = await compressImage(file);
                            setImageUrl(compressed);
                          } catch (err) {
                            console.error('Failed to compress image:', err);
                          }
                        }
                      }} 
                    />
                  </label>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] text-slate-500 self-center">Presets:</span>
                  {(STOCK_IMAGE_PRESETS[category] || []).map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setImageUrl(preset)}
                      className="text-[10px] bg-slate-100 hover:bg-slate-200 text-slate-600 px-2 py-0.5 rounded-md border border-slate-300"
                    >
                      Preset #{idx + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600">Tags (comma separated)</label>
            <input
              type="text"
              placeholder="e.g. Calculators, 1stYear, ExamApproved, FastSale"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full bg-slate-100 border border-slate-300 text-xs text-slate-900 rounded-xl px-4 py-2"
            />
          </div>

          {/* Seller Hostel Block preview */}
          <div className="p-3 bg-white/80 rounded-xl border border-slate-200 flex items-center gap-3 text-xs text-slate-600">
            <Building2 className="w-4 h-4 text-indigo-600 shrink-0" />
            <div>
              Posting as <strong className="text-slate-900">{currentUser.name}</strong> ({currentUser.role}) • Room Pickup at <strong className="text-indigo-600">{currentUser.hostelBlock}, Room {currentUser.roomNumber}</strong>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-2xl text-sm transition-all shadow-lg shadow-indigo-600/20"
          >
            Publish Listing on Marketplace
          </button>
        </form>

      </div>
    </div>
  );
};
