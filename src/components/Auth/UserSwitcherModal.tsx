import React, { useState } from 'react';
import { X, UserCheck, ShieldCheck, Building2, Plus, UserPlus } from 'lucide-react';
import { User, UserRole, AcademicYear } from '../../types';
import { compressImage } from '../../utils';

interface UserSwitcherModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User;
  allUsers: User[];
  onSelectUser: (user: User) => void;
  onRegisterCustomUser: (newUser: User) => void;
}

export const UserSwitcherModal: React.FC<UserSwitcherModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  allUsers,
  onSelectUser,
  onRegisterCustomUser
}) => {
  if (!isOpen) return null;

  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // New user form states
  const [name, setName] = useState('');
  const [role, setRole] = useState<UserRole>('Junior');
  const [year, setYear] = useState<AcademicYear>('1st Year (Junior)');
  const [hostelBlock, setHostelBlock] = useState('');
  const [roomNumber, setRoomNumber] = useState('210');
  const [department, setDepartment] = useState('Computer Science');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200');
  const [registerPassword, setRegisterPassword] = useState('');

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file);
        setAvatar(compressed);
      } catch (err) {
        console.warn('Failed to compress image:', err);
      }
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !registerPassword.trim()) return;

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      avatar: avatar?.trim() || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      year,
      role,
      hostelBlock,
      roomNumber,
      department,
      phone: phone?.trim() || '+91 98765 00000',
      bio: `Student in ${department}, residing at ${hostelBlock} Room ${roomNumber}.`,
      rating: 5.0,
      reviewCount: 0,
      verifiedStudent: true,
      badges: ['Verified Student', year.includes('Junior') ? 'Freshie 2026' : 'Senior Student']
    };

    onRegisterCustomUser(newUser);
    setShowRegisterForm(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-white/80 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 text-slate-900 space-y-5">
        
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-indigo-600" />
              Switch Hostel Student Account
            </h3>
            <p className="text-xs text-slate-500">Test platform as a Senior or Junior student</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-full text-slate-500 hover:text-slate-900">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!showRegisterForm ? (
          <div className="space-y-4">
            <div className="space-y-2">
              {allUsers.map((usr) => {
                const isSelected = usr.id === currentUser.id;

                return (
                  <button
                    key={usr.id}
                    onClick={() => {
                      onSelectUser(usr);
                      onClose();
                    }}
                    className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                      isSelected
                        ? 'bg-indigo-600/10 border-indigo-600/40 text-white shadow-md'
                        : 'bg-slate-50/60 hover:bg-slate-100/80 border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={usr.avatar}
                        alt={usr.name}
                        className="w-11 h-11 rounded-2xl object-cover border border-slate-300"
                      />
                      <div className="space-y-0.5">
                        <div className="font-bold text-sm text-slate-900 flex items-center gap-2">
                          {usr.name}
                          <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold ${
                            usr.role === 'Junior'
                              ? 'bg-teal-500/20 text-teal-700 border border-teal-500/30'
                              : 'bg-indigo-600/10 text-indigo-500 border border-indigo-600/20'
                          }`}>
                            {usr.role}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500">
                          {usr.year} • {usr.department}
                        </div>
                        <div className="text-[10px] text-slate-500 font-medium">
                          ✉️ {usr.email}
                        </div>
                        <div className="text-[10px] text-indigo-600 font-medium">
                          📍 {usr.hostelBlock}, Room {usr.roomNumber}
                        </div>
                      </div>
                    </div>

                    {isSelected && (
                      <span className="text-xs bg-indigo-600 text-white font-extrabold px-2.5 py-1 rounded-xl">
                        Active
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setShowRegisterForm(true)}
              className="w-full py-3 rounded-2xl border border-dashed border-slate-300 hover:border-indigo-600/40 text-xs text-slate-600 hover:text-indigo-600 font-bold flex items-center justify-center gap-2 transition-all"
            >
              <UserPlus className="w-4 h-4" />
              Register New Custom Student Account
            </button>
          </div>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-slate-600">Student Full Name *</label>
              <input
                type="text"
                placeholder="e.g. Priyanshu Gupta"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-slate-900 mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-600">Hostel Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as UserRole)}
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-slate-900 mt-1"
                >
                  <option value="Junior">Junior Student</option>
                  <option value="Senior">Senior Student</option>
                  <option value="Hostel Rep">Hostel Rep</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-slate-600">Academic Year</label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value as AcademicYear)}
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-slate-900 mt-1"
                >
                  <option value="1st Year (Junior)">1st Year (Junior)</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year (Senior)">3rd Year (Senior)</option>
                  <option value="4th Year (Senior)">4th Year (Senior)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-600">Hostel Block</label>
                <select
                    value={hostelBlock}
                    onChange={(e) => setHostelBlock(e.target.value)}
                    required
                    className="w-full bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-slate-900 mt-1"
                  >
                    <option value="" disabled>Select Hostel Block</option>
                    <option value="Kadamb Boys Hostel">Kadamb Boys Hostel</option>
                    <option value="Gulmohar Boys Hostel">Gulmohar Boys Hostel</option>
                    <option value="Shirish Boys Hostel">Shirish Boys Hostel</option>
                    <option value="Palash Boys Hostel">Palash Boys Hostel</option>
                    <option value="Aparajita Girls Hostel">Aparajita Girls Hostel</option>
                  </select>
              </div>

              <div>
                <label className="font-bold text-slate-600">Room Number</label>
                <input
                  type="text"
                  value={roomNumber}
                  onChange={(e) => setRoomNumber(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-slate-900 mt-1"
                />
              </div>
            </div>

            <div>
              <label className="font-bold text-slate-600">Department</label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-slate-900 mt-1"
              />
            </div>

            <div>
              <label className="font-bold text-slate-600">Email Address *</label>
              <input
                type="email"
                placeholder="e.g. student@hostel.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-slate-900 mt-1"
              />
            </div>
            <div>
              <label className="font-bold text-slate-600">Password *</label>
              <input
                type="password"
                placeholder="Create a password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                required
                className="w-full bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-slate-900 mt-1"
              />
            </div>

            <div>
              <label className="font-bold text-slate-600">Mobile Number</label>
              <input
                type="tel"
                placeholder="e.g. +91 98765 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-slate-900 mt-1"
              />
            </div>

            <div>
              <label className="font-bold text-slate-600">Profile Photo</label>
              <div className="flex items-center gap-3 mt-1">
                <img
                  src={avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
                  alt="Preview"
                  className="w-10 h-10 rounded-xl object-cover border border-slate-300 shrink-0"
                  onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200')}
                />
                <div className="flex-1 space-y-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="w-full text-sm text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400 font-medium">OR paste URL:</span>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={(avatar || '').startsWith('data:') ? '' : avatar}
                      onChange={(e) => setAvatar(e.target.value)}
                      className="flex-1 bg-slate-100 border border-slate-300 rounded-lg p-1.5 text-xs text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowRegisterForm(false)}
                className="flex-1 bg-slate-100 text-slate-600 py-2.5 rounded-xl font-bold"
              >
                Back
              </button>
              <button
                type="submit"
                className="flex-1 bg-indigo-600 text-white py-2.5 rounded-xl font-bold"
              >
                Create Account
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
