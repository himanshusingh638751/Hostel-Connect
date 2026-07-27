import React from 'react';
import {
  ShoppingBag,
  MessageSquare,
  BellRing,
  MessageCircle,
  Bot,
  User,
  Sparkles,
  Users
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  totalUnreadMessages: number;
  openQuestionsCount: number;
  availableItemsCount: number;
  pinnedNoticesCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  setActiveTab,
  totalUnreadMessages,
  openQuestionsCount,
  availableItemsCount,
  pinnedNoticesCount
}) => {
  const navItems = [
    {
      id: 'marketplace',
      label: 'Buy & Sell Marketplace',
      shortLabel: 'Marketplace',
      icon: ShoppingBag,
      badge: availableItemsCount > 0 ? `${availableItemsCount} Items` : null,
      badgeColor: 'bg-indigo-600/10 text-indigo-500 border-indigo-600/20'
    },
    {
      id: 'forum',
      label: 'Q&A Forum & Mentorship',
      shortLabel: 'Senior Q&A',
      icon: MessageSquare,
      badge: openQuestionsCount > 0 ? `${openQuestionsCount} Threads` : null,
      badgeColor: 'bg-teal-500/20 text-teal-700 border-teal-500/30'
    },
    {
      id: 'notices',
      label: 'Hostel Notice Board',
      shortLabel: 'Notices',
      icon: BellRing,
      badge: pinnedNoticesCount > 0 ? `${pinnedNoticesCount} Pinned` : null,
      badgeColor: 'bg-amber-500/20 text-amber-700 border-amber-500/30'
    },
    {
      id: 'seniors',
      label: 'Senior Contacts',
      shortLabel: 'Seniors',
      icon: Users,
      badge: null,
      badgeColor: ''
    },
    {
      id: 'messages',
      label: 'Direct Student Chat',
      shortLabel: 'Chat',
      icon: MessageCircle,
      badge: totalUnreadMessages > 0 ? `${totalUnreadMessages} New` : null,
      badgeColor: 'bg-rose-500 text-white font-extrabold'
    },
    {
      id: 'ai-mentor',
      label: 'AI Hostel Advisor',
      shortLabel: 'AI Advisor',
      icon: Bot,
      badge: '24/7 AI',
      badgeColor: 'bg-slate-500/20 text-indigo-700 border-indigo-500/30'
    },
    {
      id: 'profile',
      label: 'My Account & Activity',
      shortLabel: 'My Profile',
      icon: User,
      badge: null,
      badgeColor: ''
    }
  ];

  return (
    <nav className="bg-white/95 border-b border-slate-200 backdrop-blur sticky top-16 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 sm:space-x-2 overflow-x-auto py-2 no-scrollbar scroll-smooth">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 shrink-0 ${
                  isActive
                    ? 'bg-slate-100 text-indigo-600 border border-slate-300 shadow-sm font-semibold'
                    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100/50'
                }`}
                id={`tab-${item.id}`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-500'}`} />
                <span className="hidden sm:inline">{item.label}</span>
                <span className="sm:hidden">{item.shortLabel}</span>

                {item.badge && (
                  <span
                    className={`ml-1 text-[10px] px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
