import React from 'react';
import { Bell, Check, X, MessageSquare, ShoppingBag, MessageCircle, BellRing } from 'lucide-react';
import { Notification } from '../../types';

interface NotificationDropdownProps {
  notifications: Notification[];
  onClose: () => void;
  onMarkAllAsRead: () => void;
  onSelectNotification: (notif: Notification) => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  notifications,
  onClose,
  onMarkAllAsRead,
  onSelectNotification
}) => {
  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'marketplace': return <ShoppingBag className="w-4 h-4 text-indigo-600" />;
      case 'forum': return <MessageSquare className="w-4 h-4 text-teal-600" />;
      case 'message': return <MessageCircle className="w-4 h-4 text-indigo-400" />;
      case 'notice': return <BellRing className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end pt-16 pr-4 sm:pr-8 bg-slate-50/40 backdrop-blur-xs">
      <div className="w-full max-w-sm bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden text-slate-900 animate-in fade-in duration-200">
        
        <div className="p-4 border-b border-slate-200 bg-white/80 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-sm text-slate-900">
            <Bell className="w-4 h-4 text-amber-500" />
            Notifications
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onMarkAllAsRead}
              className="text-xs text-indigo-600 hover:underline flex items-center gap-1 font-semibold"
            >
              <Check className="w-3.5 h-3.5" />
              Mark all read
            </button>
            <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:text-slate-900">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="max-h-80 overflow-y-auto divide-y divide-slate-200/60">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500">
              No notifications yet.
            </div>
          ) : (
            notifications.map((n) => (
              <button
                key={n.id}
                onClick={() => onSelectNotification(n)}
                className={`w-full text-left p-4 hover:bg-slate-100/60 transition-colors flex gap-3 ${
                  !n.read ? 'bg-slate-100/40 border-l-2 border-amber-400' : ''
                }`}
              >
                <div className="p-2 rounded-xl bg-slate-100 shrink-0 self-start">
                  {getIcon(n.type)}
                </div>
                <div className="space-y-1 min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 truncate">{n.title}</span>
                    <span className="text-[10px] text-slate-500 shrink-0">{n.createdAt}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-snug line-clamp-2">{n.message}</p>
                </div>
              </button>
            ))
          )}
        </div>

      </div>
    </div>
  );
};
