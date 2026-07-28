import React, { useState } from 'react';
import {
  Building2,
  Search,
  PlusCircle,
  Heart,
  Bell,
  UserCheck,
  ChevronDown,
  Sparkles,
  ShieldCheck,
  LogOut,
  SlidersHorizontal,
  GraduationCap,
  Moon,
  Sun
} from 'lucide-react';
import { User, Notification } from '../types';

interface HeaderProps {
  currentUser: User;
  allUsers: User[];
  onSwitchUser: (user: User) => void;
  onLogout: () => void;
  wishlistCount: number;
  notifications: Notification[];
  onOpenNotifications: () => void;
  onOpenWishlist: () => void;
  onOpenCreateListing: () => void;
  onOpenCreateQuestion: () => void;
  onOpenUserSwitcher: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  activeTab: string;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  wishlistCount,
  notifications,
  onOpenNotifications,
  onOpenWishlist,
  onOpenCreateListing,
  onOpenCreateQuestion,
  onOpenUserSwitcher,
  onLogout,
  searchQuery,
  setSearchQuery,
  activeTab,
  isDarkMode,
  onToggleDarkMode
}) => {
  const unreadCount = notifications.filter(n => !n.read).length;
  const [showQuickActions, setShowQuickActions] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Platform Title */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-teal-400 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-600/20">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900 font-sans">
                  Hostel<span className="text-indigo-600">Connect</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold bg-indigo-600/10 text-indigo-600 border border-indigo-600/20 rounded-full">
                  Campus Hub
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">Junior–Senior Marketplace & Mentorship</p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xl mx-2 hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder={
                  activeTab === 'marketplace'
                    ? "Search books, calculators, lab equipment..."
                    : activeTab === 'forum'
                    ? "Search Q&A discussions, subjects, exam tips..."
                    : activeTab === 'notices'
                    ? "Search warden notices, mess updates, events..."
                    : "Search across Hostel Connect..."
                }
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-100/90 border border-slate-300/80 rounded-xl pl-10 pr-4 py-2 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/50 focus:border-indigo-600 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-900 bg-slate-200 rounded-full px-1.5 py-0.5"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Right Action Bar */}
          <div className="flex items-center gap-2 sm:gap-3">

            {/* Quick Create Action Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowQuickActions(!showQuickActions)}
                className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-600 text-white font-semibold px-3 py-2 rounded-xl text-sm transition-all shadow-md shadow-indigo-600/10 active:scale-95"
                id="btn-quick-create"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Post / Sell</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-80" />
              </button>

              {showQuickActions && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-slate-100 border border-slate-300 rounded-2xl shadow-2xl py-2 z-50 text-slate-900"
                  onMouseLeave={() => setShowQuickActions(false)}
                >
                  <button
                    onClick={() => {
                      setShowQuickActions(false);
                      onOpenCreateListing();
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-200/60 flex items-center gap-3 text-sm transition-colors"
                  >
                    <span className="w-8 h-8 rounded-lg bg-indigo-600/10 text-indigo-600 flex items-center justify-center shrink-0">
                      📦
                    </span>
                    <div>
                      <div className="font-semibold text-slate-900">Sell Used Item</div>
                      <div className="text-xs text-slate-500">Books, calculator, equipment, etc.</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setShowQuickActions(false);
                      onOpenCreateQuestion();
                    }}
                    className="w-full text-left px-4 py-2.5 hover:bg-slate-200/60 flex items-center gap-3 text-sm transition-colors border-t border-slate-300/50"
                  >
                    <span className="w-8 h-8 rounded-lg bg-teal-500/10 text-teal-600 flex items-center justify-center shrink-0">
                      ❓
                    </span>
                    <div>
                      <div className="font-semibold text-slate-900">Ask Senior a Question</div>
                      <div className="text-xs text-slate-500">Exams, lab notes, hostel life</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Wishlist Button */}
            <button
              onClick={onOpenWishlist}
              className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-rose-400 border border-slate-300/70 transition-all"
              title="Saved Wishlist Items"
              id="btn-wishlist"
            >
              <Heart className="w-4 h-4" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={onToggleDarkMode}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-indigo-600 border border-slate-300/70 transition-all dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:border-slate-700"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications Bell */}
            <button
              onClick={onOpenNotifications}
              className="relative p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-slate-600 hover:text-amber-500 border border-slate-300/70 transition-all"
              title="Notifications"
              id="btn-notifications"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-slate-900 text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* User Account Switcher Button */}
            <button
              onClick={onOpenUserSwitcher}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/90 border border-slate-300 transition-all text-left group"
              title="Switch Active Student Account"
              id="btn-user-switcher"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-lg object-cover border border-slate-300 group-hover:scale-105 transition-transform"
              />
              <div className="hidden sm:block">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none mb-0.5">Active Student</div>
                <div className="text-xs font-bold text-slate-900 leading-none truncate max-w-[100px]">{currentUser.name}</div>
              </div>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/90 text-slate-700 font-semibold border border-slate-300 transition-all text-sm"
              title="Back to Portal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5"></path><polyline points="12 19 5 12 12 5"></polyline></svg>
              <span className="hidden sm:inline">Back</span>
            </button>

          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search marketplace, questions, notices..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-300/80 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-600/50"
            />
          </div>
        </div>

      </div>
    </header>
  );
};
