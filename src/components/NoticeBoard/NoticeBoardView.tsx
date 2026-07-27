import React, { useState } from 'react';
import {
  BellRing,
  Pin,
  Calendar,
  MapPin,
  UserCheck,
  Plus,
  Sparkles,
  AlertTriangle,
  Building2,
  X,
  CheckCircle2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Notice, NoticeCategory, User } from '../../types';

interface NoticeBoardViewProps {
  notices: Notice[];
  currentUser: User;
  onToggleRSVP: (noticeId: string) => void;
  onCreateNotice: (newNotice: Omit<Notice, 'id' | 'createdAt' | 'attendeesCount' | 'attendeeUserIds' | 'author' | 'authorId'>) => void;
  searchQuery: string;
}

const CATEGORIES: NoticeCategory[] = [
  'Official Warden Notice',
  'Hostel Event',
  'Sports & Cultural',
  'Mess Menu & Canteen',
  'Study Group',
  'Lost & Found'
];

export const NoticeBoardView: React.FC<NoticeBoardViewProps> = ({
  notices,
  currentUser,
  onToggleRSVP,
  onCreateNotice,
  searchQuery
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  // Form states for new notice
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<NoticeCategory>('Hostel Event');
  const [content, setContent] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [location, setLocation] = useState('');
  const [pinned, setPinned] = useState(false);
  const [important, setImportant] = useState(false);

  const filteredNotices = notices.filter(n => {
    if (selectedCategory !== 'All' && n.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = n.title.toLowerCase().includes(q);
      const matchContent = n.content.toLowerCase().includes(q);
      const matchCat = n.category.toLowerCase().includes(q);
      if (!matchTitle && !matchContent && !matchCat) return false;
    }
    return true;
  }).sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  const handleRSVPClick = (noticeId: string, isAttending: boolean) => {
    onToggleRSVP(noticeId);
    if (!isAttending) {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    onCreateNotice({
      title: title.trim(),
      category,
      content: content.trim(),
      eventDate: eventDate.trim() || undefined,
      location: location.trim() || undefined,
      pinned,
      important
    });

    // Reset
    setTitle('');
    setContent('');
    setEventDate('');
    setLocation('');
    setPinned(false);
    setImportant(false);
    setShowCreateModal(false);
  };

  return (
    <div className="space-y-6">

      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-950 via-slate-900 to-amber-900 border border-amber-500/20 p-6 sm:p-8 shadow-2xl">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-700 text-xs font-semibold">
            <BellRing className="w-3.5 h-3.5" />
            Hostel Announcements & Notice Board
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Official Warden Notices, <span className="text-amber-500">Events & Mess Updates</span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Stay updated with hostel gate timings, exam week guidelines, sports tournaments, mess menu votes, and senior-led workshops.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="mt-6 sm:mt-0 sm:absolute sm:right-8 sm:top-8 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold px-5 py-3 rounded-2xl text-sm flex items-center gap-2 shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Post Notice / Event
        </button>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('All')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
            selectedCategory === 'All'
              ? 'bg-amber-400 text-slate-900 shadow-md'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70 border border-slate-300/60'
          }`}
        >
          All Announcements ({notices.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = notices.filter(n => n.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-900 font-semibold shadow-md'
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

      {/* Notices Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredNotices.map((n) => {
          const isAttending = n.attendeeUserIds?.includes(currentUser.id);

          return (
            <div
              key={n.id}
              className={`relative bg-white rounded-3xl p-6 border transition-all flex flex-col justify-between shadow-xl ${
                n.important
                  ? 'border-amber-500/50 shadow-amber-500/5'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="space-y-4">
                
                {/* Header Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs bg-amber-500/10 text-amber-700 border border-amber-500/30 px-2.5 py-1 rounded-lg font-bold">
                      {n.category}
                    </span>

                    {n.pinned && (
                      <span className="text-[10px] bg-amber-500 text-slate-900 font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow">
                        <Pin className="w-3 h-3 fill-current" />
                        PINNED
                      </span>
                    )}

                    {n.important && (
                      <span className="text-[10px] bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                        <AlertTriangle className="w-3 h-3" />
                        Urgent
                      </span>
                    )}
                  </div>

                  <span className="text-[11px] text-slate-500 shrink-0">{n.createdAt}</span>
                </div>

                {/* Title & Body */}
                <h3 className="text-lg font-bold text-slate-900 leading-snug">{n.title}</h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed bg-slate-50/60 p-4 rounded-2xl border border-slate-200/80 whitespace-pre-line">
                  {n.content}
                </p>

                {/* Event date/location if present */}
                {(n.eventDate || n.location) && (
                  <div className="p-3 bg-slate-100/60 rounded-xl border border-slate-200 flex flex-wrap gap-4 text-xs text-amber-700">
                    {n.eventDate && (
                      <div className="flex items-center gap-1.5 font-semibold">
                        <Calendar className="w-4 h-4 text-amber-500" />
                        <span>{n.eventDate}</span>
                      </div>
                    )}
                    {n.location && (
                      <div className="flex items-center gap-1.5 font-semibold">
                        <MapPin className="w-4 h-4 text-amber-500" />
                        <span>{n.location}</span>
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Notice Footer */}
              <div className="mt-5 pt-4 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <img
                    src={n.author.avatar}
                    alt={n.author.name}
                    className="w-6 h-6 rounded-full object-cover border border-slate-300"
                  />
                  <span className="text-slate-500 text-[11px]">
                    By <strong className="text-slate-800">{n.author.name}</strong> ({n.author.role})
                  </span>
                </div>

                <button
                  onClick={() => handleRSVPClick(n.id, isAttending)}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all flex items-center gap-1.5 ${
                    isAttending
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-amber-700 border border-amber-500/30'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>{isAttending ? 'Attending' : 'RSVP / Interested'} ({n.attendeesCount})</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Create Notice Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 text-slate-900 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                <BellRing className="w-5 h-5 text-amber-500" />
                Post Hostel Notice / Event
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="p-1 rounded-full text-slate-500 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Announcement Title *</label>
                <input
                  type="text"
                  placeholder="e.g. Inter-Hostel Badminton Tournament / Mess Menu Vote"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-300 text-sm rounded-xl px-3.5 py-2.5 text-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as NoticeCategory)}
                    className="w-full bg-slate-100 border border-slate-300 text-xs rounded-xl px-3 py-2 text-slate-900"
                  >
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-600">Location (Optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. Block B4 Common Room"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-100 border border-slate-300 text-xs rounded-xl px-3 py-2 text-slate-900"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Event Date / Time (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Saturday, Aug 8 at 5:00 PM"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-300 text-xs rounded-xl px-3 py-2 text-slate-900"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-600">Notice Details *</label>
                <textarea
                  rows={3}
                  placeholder="Provide full announcement details..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-300 text-xs rounded-xl p-3 text-slate-900"
                />
              </div>

              <div className="flex items-center gap-4 text-xs font-medium">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} className="accent-amber-400" />
                  <span>Pin Notice to Top</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={important} onChange={(e) => setImportant(e.target.checked)} className="accent-rose-500" />
                  <span className="text-rose-400 font-bold">Mark Urgent</span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-amber-400 text-slate-900 font-bold py-3 rounded-2xl text-sm"
              >
                Publish Notice
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
