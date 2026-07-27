import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Plus,
  Heart,
  MessageCircle,
  Tag,
  Sparkles,
  ShieldCheck,
  Building2,
  Clock,
  Eye,
  SlidersHorizontal,
  X,
  CheckCircle2,
  ShoppingBag
} from 'lucide-react';
import { MarketplaceItem, ItemCategory, ItemCondition, User } from '../../types';

interface MarketplaceViewProps {
  items: MarketplaceItem[];
  currentUser: User;
  onSelectItem: (item: MarketplaceItem) => void;
  onOpenCreateListing: () => void;
  onToggleWishlist: (itemId: string) => void;
  wishlistIds: string[];
  onStartChatWithSeller: (seller: User, item: MarketplaceItem) => void;
  searchQuery: string;
}

const CATEGORIES: ItemCategory[] = [
  'Textbooks & Notes',
  'Calculators & Tech',
  'Lab Equipment & Coats',
  'Furniture & Mattress',
  'Bicycles & Transport',
  'Room Decor & Electronics',
  'Sports Gear',
  'Other'
];

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({
  items,
  currentUser,
  onSelectItem,
  onOpenCreateListing,
  onToggleWishlist,
  wishlistIds,
  onStartChatWithSeller,
  searchQuery
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedCondition, setSelectedCondition] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'popular'>('newest');
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Available' | 'Reserved'>('All');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category match
      if (selectedCategory !== 'All' && item.category !== selectedCategory) return false;
      // Condition match
      if (selectedCondition !== 'All' && item.condition !== selectedCondition) return false;
      // Price match
      if (item.price > maxPrice) return false;
      // Status match
      if (statusFilter !== 'All' && item.status !== statusFilter) return false;
      // Search Query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesSeller = item.seller.name.toLowerCase().includes(query) || item.seller.hostelBlock.toLowerCase().includes(query);
        const matchesTags = item.tags.some(t => t.toLowerCase().includes(query));
        if (!matchesTitle && !matchesCategory && !matchesDesc && !matchesSeller && !matchesTags) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'popular') return b.viewsCount - a.viewsCount;
      return 0; // newest default ordering
    });
  }, [items, selectedCategory, selectedCondition, maxPrice, statusFilter, searchQuery, sortBy]);

  return (
    <div className="space-y-6">

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-indigo-600/20 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/10 border border-indigo-600/20 text-indigo-600 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            Hostel Buy & Sell Marketplace
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Buy Used College Gear at <span className="text-indigo-600">50% to 70% Off</span> Direct from Seniors
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Pass down lab coats, scientific calculators, bicycles, engineering drawing boards, and textbooks. Safe, fast cash deals right inside your hostel block!
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              Verified Student Profiles
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              Room Pickup in Hostel
            </div>
            <div className="flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              Zero Middleman Commission
            </div>
          </div>
        </div>

        <button
          onClick={onOpenCreateListing}
          className="mt-6 sm:mt-0 sm:absolute sm:right-8 sm:top-8 bg-indigo-600 hover:bg-indigo-600 text-white font-bold px-5 py-3 rounded-2xl text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          List Your Item
        </button>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'All'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/10'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 border border-slate-300/60'
          }`}
        >
          All Items ({items.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = items.filter(i => i.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white font-semibold shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 border border-slate-300/60'
              }`}
            >
              <span>{cat}</span>
              {count > 0 && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${selectedCategory === cat ? 'bg-white/20 text-slate-900' : 'bg-slate-200 text-slate-600'}`}>
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Filter and Sort Control Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white/80 p-3.5 rounded-2xl border border-slate-200">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
              showFilters
                ? 'bg-slate-200 text-indigo-600 border-indigo-600/40'
                : 'bg-slate-100 text-slate-600 border-slate-300 hover:bg-slate-200/60'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
            {(selectedCondition !== 'All' || maxPrice < 5000 || statusFilter !== 'All') && (
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
            )}
          </button>

          <div className="text-xs text-slate-500 hidden sm:block">
            Showing <strong className="text-slate-800">{filteredItems.length}</strong> items
          </div>
        </div>

        {/* Sort dropdown */}
        <div className="flex items-center gap-2 justify-end">
          <span className="text-xs text-slate-500 hidden sm:inline">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-slate-100 border border-slate-300 text-xs text-slate-800 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="popular">Most Popular</option>
          </select>
        </div>
      </div>

      {/* Expanded Filter Drawer Panel */}
      {showFilters && (
        <div className="bg-slate-100/90 border border-slate-300 p-4 rounded-2xl space-y-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-300/60">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <Filter className="w-4 h-4 text-indigo-600" />
              Refine Search Filters
            </h3>
            <button
              onClick={() => {
                setSelectedCondition('All');
                setMaxPrice(5000);
                setStatusFilter('All');
              }}
              className="text-xs text-indigo-600 hover:underline"
            >
              Reset Filters
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            {/* Condition */}
            <div className="space-y-1.5">
              <label className="text-slate-600 font-medium">Item Condition:</label>
              <select
                value={selectedCondition}
                onChange={(e) => setSelectedCondition(e.target.value)}
                className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl px-3 py-2 focus:outline-none"
              >
                <option value="All">All Conditions</option>
                <option value="Like New">Like New</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
              </select>
            </div>

            {/* Max Price Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-slate-600 font-medium">
                <span>Max Price:</span>
                <span className="text-indigo-600 font-bold">₹{maxPrice}</span>
              </div>
              <input
                type="range"
                min="100"
                max="5000"
                step="100"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-slate-600 font-medium">Availability Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="w-full bg-white border border-slate-300 text-slate-800 rounded-xl px-3 py-2 focus:outline-none"
              >
                <option value="All">All Items (Including Reserved)</option>
                <option value="Available">Available Now</option>
                <option value="Reserved">Reserved</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-slate-50/50 rounded-3xl border border-slate-200 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900">No items found matching your filters</h3>
            <p className="text-sm text-slate-500">Try clearing search terms or selecting a different category.</p>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedCondition('All');
              setMaxPrice(5000);
            }}
            className="bg-indigo-600 text-white font-bold px-4 py-2 rounded-xl text-xs hover:bg-indigo-600"
          >
            Clear All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredItems.map((item) => {
            const isWishlisted = wishlistIds.includes(item.id);
            const discountPercent = item.originalPrice
              ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
              : 0;

            return (
              <div
                key={item.id}
                className="group bg-white rounded-2xl border border-slate-200 hover:border-indigo-600/40 transition-all duration-200 flex flex-col overflow-hidden shadow-lg hover:shadow-xl hover:shadow-indigo-600/5"
              >
                {/* Photo & Badge Container */}
                <div className="relative aspect-[4/3] bg-slate-50 overflow-hidden cursor-pointer" onClick={() => onSelectItem(item)}>
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Status Overlay */}
                  {item.status === 'Reserved' && (
                    <div className="absolute inset-0 bg-slate-50/70 backdrop-blur-xs flex items-center justify-center">
                      <span className="bg-amber-500 text-slate-900 font-extrabold px-3 py-1 rounded-full text-xs shadow-md">
                        RESERVED BY BUYER
                      </span>
                    </div>
                  )}

                  {/* Wishlist Toggle Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWishlist(item.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
                      isWishlisted
                        ? 'bg-rose-500 text-white shadow-md'
                        : 'bg-white/80 text-slate-600 hover:text-slate-900 hover:bg-white'
                    }`}
                    title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
                  </button>

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="bg-white/90 text-indigo-600 border border-indigo-600/20 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {item.condition}
                    </span>
                    {discountPercent > 0 && (
                      <span className="bg-rose-500/90 text-slate-900 text-[10px] font-bold px-2 py-0.5 rounded-md backdrop-blur-xs">
                        {discountPercent}% OFF
                      </span>
                    )}
                  </div>

                  {/* Seller Hostel Block Badge */}
                  <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] bg-white/85 text-slate-800 px-2.5 py-1 rounded-lg backdrop-blur-md border border-slate-300/50">
                    <div className="flex items-center gap-1 font-medium truncate">
                      <Building2 className="w-3 h-3 text-indigo-600 shrink-0" />
                      <span className="truncate">{item.seller.hostelBlock} • Room {item.seller.roomNumber}</span>
                    </div>
                    <span className="text-amber-500 font-bold shrink-0">★ {item.seller.rating}</span>
                  </div>
                </div>

                {/* Content Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[11px] text-slate-500">
                      <span>{item.category}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {item.createdAt}
                      </span>
                    </div>

                    <h3
                      onClick={() => onSelectItem(item)}
                      className="font-bold text-slate-900 text-sm line-clamp-2 hover:text-indigo-600 cursor-pointer transition-colors leading-snug"
                    >
                      {item.title}
                    </h3>
                  </div>

                  {/* Price & Seller Info */}
                  <div className="pt-2 border-t border-slate-200 space-y-3">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <span className="text-lg font-extrabold text-slate-900">₹{item.price}</span>
                        {item.originalPrice && (
                          <span className="ml-2 text-xs text-slate-500 line-through">
                            ₹{item.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        {item.viewsCount} views
                      </span>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-1">
                      <button
                        onClick={() => onSelectItem(item)}
                        className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-2 rounded-xl text-xs transition-colors border border-slate-300"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => onStartChatWithSeller(item.seller, item)}
                        className="w-full bg-indigo-600 hover:bg-indigo-600 text-white font-bold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <MessageCircle className="w-3.5 h-3.5" />
                        Chat Seller
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
