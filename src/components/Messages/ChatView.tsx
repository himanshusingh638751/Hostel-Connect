import React, { useState } from 'react';
import {
  Send,
  Building2,
  Phone,
  ShoppingBag,
  Clock,
  Sparkles,
  ShieldCheck,
  CheckCheck,
  MessageCircle
} from 'lucide-react';
import { Conversation, ChatMessage, User, MarketplaceItem } from '../../types';

interface ChatViewProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  setActiveConversationId: (id: string) => void;
  messagesMap: Record<string, ChatMessage[]>;
  currentUser: User;
  onSendMessage: (conversationId: string, text: string) => void;
  items: MarketplaceItem[];
  onSelectItem: (item: MarketplaceItem) => void;
}

const QUICK_REPLIES = [
  "Hi! Is this item still available?",
  "Can I come to your room to check it out?",
  "Would you accept ₹750 for this?",
  "Thanks Senior! That was super helpful."
];

export const ChatView: React.FC<ChatViewProps> = ({
  conversations,
  activeConversationId,
  setActiveConversationId,
  messagesMap,
  currentUser,
  onSendMessage,
  items,
  onSelectItem
}) => {
  const [inputText, setInputText] = useState('');

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];
  const activeMessages = activeConv ? (messagesMap[activeConv.id] || []) : [];

  const otherParticipant = activeConv
    ? activeConv.participants.find(p => p.id !== currentUser.id) || activeConv.participants[0]
    : null;

  const relatedItem = activeConv?.relatedItemId
    ? items.find(i => i.id === activeConv.relatedItemId)
    : null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConv) return;
    onSendMessage(activeConv.id, inputText.trim());
    setInputText('');
  };

  const handleQuickReply = (text: string) => {
    if (!activeConv) return;
    onSendMessage(activeConv.id, text);
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden h-[calc(100vh-12rem)] min-h-[500px] flex flex-col md:flex-row">
      
      {/* Left Panel: Conversations List */}
      <div className="w-full md:w-80 lg:w-96 border-r border-slate-200 flex flex-col bg-slate-50/60 shrink-0">
        <div className="p-4 border-b border-slate-200 bg-white/80 flex items-center justify-between">
          <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
            <MessageCircle className="w-4 h-4 text-indigo-600" />
            Hostel Messages
          </h2>
          <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold">
            {conversations.length} Active
          </span>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-slate-200/60">
          {conversations.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 space-y-2">
              <p>No chat history yet.</p>
              <p className="text-[11px] text-slate-500">Click "Chat Seller" on any marketplace item or senior profile to start!</p>
            </div>
          ) : (
            conversations.map((conv) => {
              const other = conv.participants.find(p => p.id !== currentUser.id) || conv.participants[0];
              const isSelected = activeConv?.id === conv.id;
              const unread = conv.unreadCount[currentUser.id] || 0;

              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`w-full text-left p-4 transition-all flex items-start gap-3 hover:bg-slate-100/50 ${
                    isSelected ? 'bg-slate-100/90 border-l-4 border-indigo-600' : ''
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={other.avatar}
                      alt={other.name}
                      className="w-11 h-11 rounded-2xl object-cover border border-slate-300"
                    />
                    <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-indigo-600 rounded-full border-2 border-white" />
                  </div>

                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 text-xs truncate">{other.name}</span>
                      <span className="text-[10px] text-slate-500 shrink-0">{conv.lastMessageTimestamp}</span>
                    </div>

                    <p className="text-[11px] text-slate-500 truncate leading-tight">{conv.lastMessage}</p>

                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-indigo-600/90 font-medium truncate">
                        📍 {other.hostelBlock} • Room {other.roomNumber}
                      </span>
                      {unread > 0 && (
                        <span className="bg-indigo-600 text-white text-[10px] font-extrabold px-1.5 py-0.2 rounded-full shadow">
                          {unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Right Panel: Chat Thread */}
      {activeConv && otherParticipant ? (
        <div className="flex-1 flex flex-col bg-white">
          
          {/* Header */}
          <div className="p-4 border-b border-slate-200 bg-white/90 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={otherParticipant.avatar}
                alt={otherParticipant.name}
                className="w-10 h-10 rounded-2xl object-cover border border-slate-300"
              />
              <div>
                <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  {otherParticipant.name}
                  {otherParticipant.verifiedStudent && (
                    <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                  )}
                  <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.2 rounded-md">
                    {otherParticipant.role}
                  </span>
                </div>
                <div className="text-xs text-slate-500">
                  {otherParticipant.year} • {otherParticipant.hostelBlock}, Room {otherParticipant.roomNumber}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={`tel:${otherParticipant.phone}`}
                className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2 text-xs font-semibold"
                title="Call Student"
              >
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">{otherParticipant.phone}</span>
              </a>
            </div>
          </div>

          {/* Related Item Snapshot Banner if present */}
          {relatedItem && (
            <div className="bg-slate-50 p-3 px-4 border-b border-slate-200 flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-3 overflow-hidden">
                <img src={relatedItem.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" />
                <div className="truncate">
                  <div className="text-[10px] text-indigo-600 font-semibold uppercase">Discussing Marketplace Listing</div>
                  <div className="font-bold text-slate-900 truncate">{relatedItem.title}</div>
                  <div className="text-slate-500">Asking Price: ₹{relatedItem.price}</div>
                </div>
              </div>
              <button
                onClick={() => onSelectItem(relatedItem)}
                className="bg-indigo-600/10 text-indigo-500 border border-indigo-600/20 font-bold px-3 py-1.5 rounded-lg text-xs hover:bg-indigo-600 hover:text-white transition-colors shrink-0"
              >
                View Item
              </button>
            </div>
          )}

          {/* Message History */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40">
            {activeMessages.map((msg) => {
              const isMine = msg.senderId === currentUser.id;

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isMine ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl p-3 text-xs sm:text-sm space-y-1 shadow ${
                      isMine
                        ? 'bg-indigo-600 text-white font-medium rounded-br-none'
                        : 'bg-slate-100 text-slate-900 rounded-bl-none border border-slate-300/60'
                    }`}
                  >
                    <p className="whitespace-pre-line leading-relaxed">{msg.text}</p>
                    <div className={`text-[10px] text-right flex items-center justify-end gap-1 ${isMine ? 'text-slate-900/80' : 'text-slate-500'}`}>
                      <span>{msg.timestamp}</span>
                      {isMine && <CheckCheck className="w-3 h-3" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Replies */}
          <div className="p-2 px-4 bg-white border-t border-slate-200 flex items-center gap-2 overflow-x-auto no-scrollbar">
            <span className="text-[10px] font-bold text-slate-500 uppercase shrink-0">Quick Reply:</span>
            {QUICK_REPLIES.map((text, i) => (
              <button
                key={i}
                onClick={() => handleQuickReply(text)}
                className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900 px-2.5 py-1 rounded-full border border-slate-300 whitespace-nowrap shrink-0 transition-colors"
              >
                {text}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Type your message to student senior/junior..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-600/50"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="bg-indigo-600 hover:bg-indigo-600 text-white p-3 rounded-2xl transition-all shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-500 text-sm">
          Select a student conversation on the left to start chatting!
        </div>
      )}

    </div>
  );
};
