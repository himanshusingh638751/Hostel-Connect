import React, { useState } from 'react';
import { User as UserIcon, Phone, Mail, ShieldCheck, MessageCircle, Building2, Search, Star, X } from 'lucide-react';
import { User, MentorReview } from '../../types';

interface SeniorsDirectoryViewProps {
  allUsers: User[];
  currentUser: User;
  onStartChat: (user: User) => void;
  mentorReviews: MentorReview[];
  onRateMentor: (mentorId: string, rating: number, testimonial: string) => void;
}

export const SeniorsDirectoryView: React.FC<SeniorsDirectoryViewProps> = ({
  allUsers,
  currentUser,
  onStartChat,
  mentorReviews,
  onRateMentor
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingModalMentor, setRatingModalMentor] = useState<User | null>(null);

  // Form states for rating
  const [rating, setRating] = useState(5);
  const [testimonial, setTestimonial] = useState('');

  // Filter seniors and hostel reps
  const seniors = allUsers.filter(u => 
    (u.role === 'Senior' || u.role === 'Hostel Rep' || u.year.includes('Senior'))
  );

  const filteredSeniors = seniors.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.hostelBlock.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (ratingModalMentor && testimonial.trim()) {
      onRateMentor(ratingModalMentor.id, rating, testimonial.trim());
      setRatingModalMentor(null);
      setTestimonial('');
      setRating(5);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">Senior Contact Directory</h2>
          <p className="text-sm text-slate-500 mt-1">
            Connect with verified senior students for mentorship, academic help, or hostel guidance.
          </p>
        </div>
        
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search seniors, dept, hostel..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-indigo-600/40 text-slate-900 placeholder:text-slate-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSeniors.map(senior => {
          const sReviews = mentorReviews.filter(r => r.mentorId === senior.id);
          const avgRating = sReviews.length > 0 
            ? (sReviews.reduce((sum, r) => sum + r.rating, 0) / sReviews.length).toFixed(1)
            : 'New';

          return (
          <div key={senior.id} className="bg-white border border-slate-200 rounded-3xl p-5 hover:border-indigo-600/20 transition-all flex flex-col h-full shadow-lg">
            <div className="flex gap-4">
              <div className="relative shrink-0">
                <img
                  src={senior.avatar}
                  alt={senior.name}
                  className="w-16 h-16 rounded-2xl object-cover border border-slate-300"
                />
                {senior.verifiedStudent && (
                  <span className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-0.5 rounded-lg border-2 border-white" title="Verified Senior">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-slate-900 text-base truncate pr-2">{senior.name}</h3>
                  <div className="flex items-center gap-1 text-amber-500 bg-amber-400/10 px-2 py-0.5 rounded-full shrink-0">
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-[10px] font-bold">{avgRating}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="bg-indigo-600/10 text-indigo-600 border border-indigo-600/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    {senior.role}
                  </span>
                  <span className="text-[10px] text-slate-500 border border-slate-300 px-2 py-0.5 rounded-full">
                    {senior.year}
                  </span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-4 line-clamp-2 italic">
              "{senior.bio}"
            </p>

            <div className="mt-4 space-y-2 text-xs text-slate-500 bg-slate-50/50 p-3 rounded-2xl border border-slate-200/60 flex-1">
              <div className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-indigo-600/70" />
                <span>{senior.hostelBlock}, Room {senior.roomNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <UserIcon className="w-3.5 h-3.5 text-indigo-600/70" />
                <span className="truncate">{senior.department}</span>
              </div>
              
              {/* Display latest testimonial if any */}
              {sReviews.length > 0 && (
                <div className="mt-3 pt-3 border-t border-slate-200/50">
                  <p className="text-[10px] text-slate-500 mb-1">Latest Testimonial:</p>
                  <p className="italic text-slate-600 line-clamp-2">"{sReviews[0].testimonial}"</p>
                  <p className="text-[10px] text-slate-500 mt-1">- {sReviews[0].mentee.name}</p>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200 flex gap-2">
              <button
                onClick={() => onStartChat(senior)}
                disabled={currentUser.id === senior.id}
                className="flex-1 bg-indigo-600 hover:bg-indigo-600 text-white font-bold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <MessageCircle className="w-4 h-4" />
                Message
              </button>
              <button
                onClick={() => setRatingModalMentor(senior)}
                disabled={currentUser.id === senior.id}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-amber-500 rounded-xl transition-colors border border-slate-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                title="Rate Mentor"
              >
                <Star className="w-4 h-4" />
              </button>
            </div>
          </div>
        )})}

        {filteredSeniors.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 text-sm bg-slate-50/50 rounded-3xl border border-slate-200">
            No seniors found matching your search.
          </div>
        )}
      </div>

      {/* Rating Modal */}
      {ratingModalMentor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="p-4 sm:p-6 border-b border-slate-200 flex items-center justify-between">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">Rate Mentor</h2>
              <button
                onClick={() => setRatingModalMentor(null)}
                className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleRatingSubmit} className="p-4 sm:p-6 space-y-6">
              <div className="flex items-center gap-4 p-4 bg-slate-50/50 rounded-2xl border border-slate-200/60">
                <img src={ratingModalMentor.avatar} alt="" className="w-12 h-12 rounded-xl object-cover" />
                <div>
                  <h3 className="font-bold text-slate-900 text-sm">{ratingModalMentor.name}</h3>
                  <p className="text-xs text-slate-500">{ratingModalMentor.department}</p>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star 
                        className={`w-8 h-8 transition-colors ${
                          star <= rating ? 'text-amber-500 fill-current' : 'text-slate-700'
                        }`} 
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-600 mb-2">
                  Testimonial
                </label>
                <textarea
                  required
                  value={testimonial}
                  onChange={(e) => setTestimonial(e.target.value)}
                  placeholder="How did this senior help you?"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-600 focus:outline-none focus:border-indigo-600/40 min-h-[100px] resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setRatingModalMentor(null)}
                  className="flex-1 px-4 py-2.5 rounded-xl font-bold text-sm bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!testimonial.trim()}
                  className="flex-1 px-4 py-2.5 rounded-xl font-bold text-sm bg-indigo-600 text-white hover:bg-indigo-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Submit Rating
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
