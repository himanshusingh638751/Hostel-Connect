import React, { useState } from 'react';
import { X, UserCheck, ShieldCheck, Building2, Plus, UserPlus } from 'lucide-react';
import { User, UserRole, AcademicYear } from '../../types';

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
  const [hostelBlock, setHostelBlock] = useState('Block B2 (Boys)');
  const [roomNumber, setRoomNumber] = useState('210');
  const [department, setDepartment] = useState('Computer Science');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@hostel.edu`,
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      year,
      role,
      hostelBlock,
      roomNumber,
      department,
      phone: '+91 98765 00000',
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
                <input
                  type="text"
                  value={hostelBlock}
                  onChange={(e) => setHostelBlock(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-slate-900 mt-1"
                />
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
