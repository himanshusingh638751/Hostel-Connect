import React, { useState } from 'react';
import {
  User as UserIcon,
  Building2,
  Phone,
  Mail,
  ShieldCheck,
  Star,
  ShoppingBag,
  MessageSquare,
  Heart,
  Award,
  Edit,
  CheckCircle2,
  X,
  Trash2
} from 'lucide-react';
import { User, MarketplaceItem, ForumQuestion, SellerReview } from '../../types';

interface ProfileViewProps {
  currentUser: User;
  userListings: MarketplaceItem[];
  userQuestions: ForumQuestion[];
  wishlistItems: MarketplaceItem[];
  reviews: SellerReview[];
  onSelectItem: (item: MarketplaceItem) => void;
  onSelectQuestion: (question: ForumQuestion) => void;
  onUpdateProfile: (updated: Partial<User>) => void;
  onToggleItemStatus: (itemId: string, status: 'Available' | 'Reserved' | 'Sold') => void;
  onRemoveWishlist: (itemId: string) => void;
  onDeleteProfile?: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  currentUser,
  userListings,
  userQuestions,
  wishlistItems,
  reviews,
  onSelectItem,
  onSelectQuestion,
  onUpdateProfile,
  onToggleItemStatus,
  onRemoveWishlist,
  onDeleteProfile
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'listings' | 'questions' | 'wishlist' | 'reviews'>('listings');
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  // Edit form state
  const [name, setName] = useState(currentUser.name);
  const [hostelBlock, setHostelBlock] = useState(currentUser.hostelBlock);
  const [roomNumber, setRoomNumber] = useState(currentUser.roomNumber);
  const [department, setDepartment] = useState(currentUser.department);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [bio, setBio] = useState(currentUser.bio);

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile({
      name,
      hostelBlock,
      roomNumber,
      department,
      email,
      phone,
      bio
    });
    setShowEditModal(false);
  };

  const userReviews = reviews.filter(r => r.sellerId === currentUser.id);

  return (
    <div className="space-y-6">

      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl object-cover border-4 border-slate-200 shadow-xl"
              />
              <span className="absolute -bottom-1 -right-1 bg-indigo-600 text-white p-1.5 rounded-xl border-2 border-white" title="Verified Hostel Student">
                <ShieldCheck className="w-4 h-4" />
              </span>
            </div>

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-extrabold text-slate-900">{currentUser.name}</h1>
                <span className="bg-indigo-600/10 text-indigo-600 border border-indigo-600/20 text-xs font-bold px-3 py-0.5 rounded-full">
                  {currentUser.role}
                </span>
                <span className="bg-slate-100 text-slate-600 text-xs font-medium px-3 py-0.5 rounded-full border border-slate-300">
                  {currentUser.year}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1 font-semibold text-indigo-600">
                  📍 {currentUser.hostelBlock}, Room {currentUser.roomNumber}
                </span>
                <span className="flex items-center gap-1">
                  🎓 {currentUser.department}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> {currentUser.email}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> {currentUser.phone}
                </span>
                <span className="flex items-center gap-1 text-amber-500 font-bold">
                  ★ {currentUser.rating} ({currentUser.reviewCount} seller reviews)
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 max-w-xl leading-relaxed">
                "{currentUser.bio}"
              </p>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                {currentUser.badges.map(badge => (
                  <span key={badge} className="text-[10px] bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg border border-slate-300 font-medium">
                    🏆 {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowEditModal(true)}
            className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold px-4 py-2.5 rounded-2xl text-xs flex items-center gap-2 transition-all self-start md:self-auto shrink-0"
          >
            <Edit className="w-4 h-4 text-indigo-600" />
            Edit Profile
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveSubTab('listings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeSubTab === 'listings'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-slate-500 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          <span>My Listings ({userListings.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('questions')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeSubTab === 'questions'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-slate-500 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <MessageSquare className="w-4 h-4" />
          <span>My Questions ({userQuestions.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('wishlist')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeSubTab === 'wishlist'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-slate-500 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Saved Wishlist ({wishlistItems.length})</span>
        </button>

        <button
          onClick={() => setActiveSubTab('reviews')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold transition-all ${
            activeSubTab === 'reviews'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-white text-slate-500 hover:text-slate-900 border border-slate-200'
          }`}
        >
          <Star className="w-4 h-4" />
          <span>Seller Feedback ({userReviews.length})</span>
        </button>
      </div>

      {/* Sub Tab Contents */}
      {activeSubTab === 'listings' && (
        <div className="space-y-4">
          {userListings.length === 0 ? (
            <div className="text-center py-12 bg-slate-50/50 rounded-3xl border border-slate-200 text-xs text-slate-500">
              You haven't listed any items for sale yet.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userListings.map(item => (
                <div key={item.id} className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
                  <div className="flex gap-3">
                    <img src={item.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-slate-900 text-xs truncate">{item.title}</h4>
                      <p className="text-indigo-600 font-extrabold text-sm">₹{item.price}</p>
                      <span className="text-[10px] text-slate-500">{item.category}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-xs">
                    <span className="text-slate-500">Status:</span>
                    <select
                      value={item.status}
                      onChange={(e) => onToggleItemStatus(item.id, e.target.value as any)}
                      className="bg-slate-100 text-xs text-slate-800 border border-slate-300 rounded-lg px-2 py-1"
                    >
                      <option value="Available">Available</option>
                      <option value="Reserved">Reserved</option>
                      <option value="Sold">Sold</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'questions' && (
        <div className="space-y-3">
          {userQuestions.length === 0 ? (
            <div className="text-center py-12 bg-slate-50/50 rounded-3xl border border-slate-200 text-xs text-slate-500">
              You haven't asked any questions on the forum yet.
            </div>
          ) : (
            userQuestions.map(q => (
              <div key={q.id} className="bg-white p-4 rounded-2xl border border-slate-200 flex items-center justify-between">
                <div>
                  <h4 onClick={() => onSelectQuestion(q)} className="font-bold text-slate-900 text-sm cursor-pointer hover:text-indigo-600">
                    {q.title}
                  </h4>
                  <p className="text-xs text-slate-500">{q.category} • {q.createdAt}</p>
                </div>
                <button onClick={() => onSelectQuestion(q)} className="text-xs bg-slate-100 text-indigo-600 px-3 py-1.5 rounded-xl border border-slate-300 font-semibold">
                  View Thread
                </button>
              </div>
            ))
          )}
        </div>
      )}

      {activeSubTab === 'wishlist' && (
        <div className="space-y-3">
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12 bg-slate-50/50 rounded-3xl border border-slate-200 text-xs text-slate-500">
              Your wishlist is currently empty. Click the heart icon on any marketplace item to save it!
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {wishlistItems.map(item => (
                <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-200 space-y-3 flex flex-col justify-between">
                  <div className="flex gap-3">
                    <img src={item.images[0]} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                    <div>
                      <h4 onClick={() => onSelectItem(item)} className="font-bold text-slate-900 text-xs line-clamp-2 cursor-pointer hover:text-indigo-600">
                        {item.title}
                      </h4>
                      <p className="text-indigo-600 font-extrabold text-sm">₹{item.price}</p>
                      <p className="text-[10px] text-slate-500">{item.seller.hostelBlock}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200">
                    <button onClick={() => onSelectItem(item)} className="flex-1 bg-indigo-600 text-white font-bold py-1.5 rounded-lg text-xs">
                      View Item
                    </button>
                    <button onClick={() => onRemoveWishlist(item.id)} className="p-1.5 rounded-lg bg-slate-100 text-rose-400 hover:bg-slate-200">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeSubTab === 'reviews' && (
        <div className="space-y-3">
          {userReviews.length === 0 ? (
            <div className="text-center py-12 bg-slate-50/50 rounded-3xl border border-slate-200 text-xs text-slate-500">
              No seller reviews received yet.
            </div>
          ) : (
            userReviews.map(rev => (
              <div key={rev.id} className="bg-white p-4 rounded-2xl border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{rev.reviewer.name}</span>
                  <span className="text-amber-500 font-bold">★ {rev.rating}.0</span>
                </div>
                <p className="text-slate-600 italic">"{rev.comment}"</p>
                <div className="text-[10px] text-slate-500">Item: {rev.itemTitle}</div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Danger Zone */}
      <div className="mt-8 pt-8 border-t border-slate-200">
        <h3 className="text-sm font-bold text-slate-900 mb-4">Danger Zone</h3>
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h4 className="text-rose-900 font-bold text-sm">Delete Profile</h4>
            <p className="text-xs text-rose-700 mt-1">
              Once you delete your profile, there is no going back. Please be certain.
            </p>
          </div>
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="shrink-0 flex items-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
          >
            <Trash2 className="w-4 h-4" />
            Delete Account
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm">
          <div className="bg-white border border-rose-200 rounded-3xl p-6 w-full max-w-sm space-y-4 text-slate-900 shadow-xl shadow-rose-900/5">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-2">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Delete Profile?</h3>
              <p className="text-sm text-slate-600">
                This action cannot be undone. All your listings, questions, and data will be permanently removed.
              </p>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-sm font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(false);
                  onDeleteProfile?.();
                }}
                className="flex-1 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-sm font-bold transition-all"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 w-full max-w-lg space-y-4 text-slate-900">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h3 className="font-bold text-slate-900 text-base">Edit Student Profile</h3>
              <button onClick={() => setShowEditModal(false)} className="text-slate-500 hover:text-slate-900">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-600">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-100 border border-slate-300 text-xs rounded-xl p-2.5 text-slate-900 mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-600">Hostel Block</label>
                  <input type="text" value={hostelBlock} onChange={(e) => setHostelBlock(e.target.value)} className="w-full bg-slate-100 border border-slate-300 text-xs rounded-xl p-2.5 text-slate-900 mt-1" />
                </div>
                <div>
                  <label className="font-bold text-slate-600">Room Number</label>
                  <input type="text" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} className="w-full bg-slate-100 border border-slate-300 text-xs rounded-xl p-2.5 text-slate-900 mt-1" />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-600">Department</label>
                <input type="text" value={department} onChange={(e) => setDepartment(e.target.value)} className="w-full bg-slate-100 border border-slate-300 text-xs rounded-xl p-2.5 text-slate-900 mt-1" />
              </div>

              <div>
                <label className="font-bold text-slate-600">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-100 border border-slate-300 text-xs rounded-xl p-2.5 text-slate-900 mt-1" />
              </div>

              <div>
                <label className="font-bold text-slate-600">Phone / WhatsApp</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-slate-100 border border-slate-300 text-xs rounded-xl p-2.5 text-slate-900 mt-1" />
              </div>

              <div>
                <label className="font-bold text-slate-600">Bio / Mentorship Notes</label>
                <textarea rows={2} value={bio} onChange={(e) => setBio(e.target.value)} className="w-full bg-slate-100 border border-slate-300 text-xs rounded-xl p-2.5 text-slate-900 mt-1" />
              </div>

              <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl text-xs">
                Save Profile Updates
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
