import React, { useState } from 'react';
import { User, UserRole, AcademicYear } from '../../types';
import { Building2, UserCheck, GraduationCap, ChevronRight, ArrowLeft, UserPlus } from 'lucide-react';
import { compressImage } from '../../utils';

interface LoginViewProps {
  allUsers: User[];
  onLogin: (user: User) => void;
  onRegister?: (user: User) => void;
}

export function LoginView({ allUsers, onLogin, onRegister }: LoginViewProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  
  // Registration form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [department, setDepartment] = useState('Computer Science');
  const [hostelBlock, setHostelBlock] = useState('');
  const [roomNumber, setRoomNumber] = useState('210');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUserId, setLoginUserId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleRoleSelect = (role: UserRole, year?: string) => {
    setSelectedRole(role);
    if (year) setSelectedYear(year);
    setShowRegisterForm(false);
    setLoginError('');
  };

  const handleUserLogin = (user: User) => {
    onLogin(user);
  };
  
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const compressed = await compressImage(file);
        setAvatar(compressed);
      } catch (err) {
        console.error('Failed to compress image:', err);
      }
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const isSenior = selectedRole === 'Senior';
    
    if (!registerPassword.trim()) return;
    if (!registerPassword.trim()) return;
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      avatar: avatar?.trim() || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
      year: isSenior ? (selectedYear || '4th Year (Senior)') : '1st Year (Junior)' as AcademicYear,
      role: isSenior ? 'Senior' : 'Junior',
      hostelBlock,
      roomNumber,
      department,
      phone: phone?.trim() || '+91 98765 00000',
      bio: `Student in ${department}, residing at ${hostelBlock} Room ${roomNumber}.`,
      rating: 5.0,
      reviewCount: 0,
      verifiedStudent: true,
      badges: ['Verified Student', isSenior ? 'Senior Student' : 'Freshie 2026'],
      password: registerPassword
    };

    if (onRegister) {
      onRegister(newUser);
    }
  };

  const availableUsers = allUsers.filter(u => 
    selectedRole === 'Senior' 
      ? (u.role === 'Senior' || u.role === 'Hostel Rep')
      : u.role === 'Junior'
  );

  if (selectedRole) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8 border border-slate-200 overflow-hidden relative">
          <div className="flex items-center gap-2 mb-6">
            <button 
              onClick={() => {
                if (showRegisterForm) {
                  setShowRegisterForm(false);
                } else {
                  setSelectedRole(null);
                }
              }}
              className="flex items-center gap-1.5 p-2 -ml-2 pr-3 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors font-semibold text-sm"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h2 className="text-lg font-extrabold text-slate-900 uppercase tracking-wider">
              {showRegisterForm ? 'Register Account' : `Select ${selectedRole} Account`}
            </h2>
          </div>
          
          {!showRegisterForm ? (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
              <form onSubmit={(e) => {
                e.preventDefault();
                setLoginError('');
                const user = availableUsers.find(u => u.email === loginUserId || u.id === loginUserId);
                if (!user) {
                  setLoginError('User ID / Email not found.');
                  return;
                }
                if (user.password && user.password !== loginPassword) {
                  setLoginError('Incorrect password.');
                  return;
                }
                handleUserLogin(user);
              }} className="space-y-4">
                <div>
                  <label className="font-bold text-slate-600">Email or User ID</label>
                  <input
                    type="text"
                    placeholder="e.g. rohan.s@hostel.edu"
                    value={loginUserId}
                    onChange={(e) => setLoginUserId(e.target.value)}
                    className="w-full bg-slate-100 border border-slate-300 rounded-xl p-3 text-slate-900 mt-1"
                    required
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-600">Password</label>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="w-full bg-slate-100 border border-slate-300 rounded-xl p-3 text-slate-900 mt-1"
                    required
                  />
                </div>
                {loginError && <div className="text-red-500 text-sm font-semibold">{loginError}</div>}
                
                <div className="text-xs text-slate-500 bg-slate-100 p-3 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-700 mb-1">Demo Accounts:</p>
                  {selectedRole === 'Senior' ? (
                    <p>ID: <b>rohan.s@hostel.edu</b><br/>Pass: <b>password123</b></p>
                  ) : (
                    <p>ID: <b>aarav.p@hostel.edu</b><br/>Pass: <b>password123</b></p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl text-sm transition-all shadow-lg shadow-indigo-600/20 active:scale-[0.98]"
                >
                  Login to {selectedRole} Portal
                </button>
              </form>

              <div className="relative py-4 flex items-center justify-center">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
                <div className="relative bg-white px-4 text-xs font-bold text-slate-400">OR</div>
              </div>

              <button
                onClick={() => setShowRegisterForm(true)}
                className="w-full py-3.5 rounded-xl border-2 border-dashed border-slate-300 hover:border-indigo-600/40 text-sm text-slate-600 hover:text-indigo-600 font-bold flex items-center justify-center gap-2 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                Register New {selectedRole} Account
              </button>
            </div>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-4 text-sm animate-in fade-in slide-in-from-right-8 duration-300">
              <div>
                <label className="font-bold text-slate-600">Student Full Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Priyanshu Gupta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl p-3 text-slate-900 mt-1"
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
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl p-3 text-slate-900 mt-1"
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
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl p-3 text-slate-900 mt-1"
                />
              </div>

              <div>
                <label className="font-bold text-slate-600">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="e.g. +91 98765 00000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl p-3 text-slate-900 mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-600">Hostel Block</label>
                  <select
                    value={hostelBlock}
                    onChange={(e) => setHostelBlock(e.target.value)}
                    required
                    className="w-full bg-slate-100 border border-slate-300 rounded-xl p-3 text-slate-900 mt-1"
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
                  <label className="font-bold text-slate-600">Room</label>
                  <input
                    type="text"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                    className="w-full bg-slate-100 border border-slate-300 rounded-xl p-3 text-slate-900 mt-1"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-600">Department</label>
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl p-3 text-slate-900 mt-1"
                />
              </div>

              <div>
                <label className="font-bold text-slate-600">Profile Photo</label>
                <div className="flex items-center gap-4 mt-1">
                  <img
                    src={avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200'}
                    alt="Preview"
                    className="w-12 h-12 rounded-xl object-cover border border-slate-300 shrink-0"
                    onError={(e) => (e.currentTarget.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200')}
                  />
                  <div className="flex-1 space-y-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-slate-400 font-medium">OR paste URL:</span>
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

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3.5 mt-2 rounded-xl font-bold flex justify-center items-center gap-2 transition-all"
              >
                Create Account & Login
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="p-8 text-center border-b border-slate-100 bg-white">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-indigo-600 to-teal-400 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-600/20 mb-4">
            <Building2 className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Hostel Connect</h1>
          <p className="text-sm text-slate-500 mt-2">Choose your portal to continue</p>
        </div>

        <div className="flex flex-col md:flex-row">
          {/* Junior Section */}
          <div className="flex-1 bg-teal-50/30 hover:bg-teal-50/80 transition-colors p-8 relative group border-b md:border-b-0 md:border-r border-slate-100 flex flex-col">
            <div className="w-16 h-16 rounded-2xl bg-teal-500 text-white flex items-center justify-center shadow-lg shadow-teal-500/20 mb-6">
              <UserCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">Junior Gateway</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">
              Access the campus marketplace to buy second-hand essentials, ask questions in the forum, and connect with verified senior mentors.
            </p>
            <button
              onClick={() => handleRoleSelect('Junior')}
              className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-between transition-all shadow-md shadow-teal-600/20 group-hover:-translate-y-0.5"
            >
              <span>Login as Junior</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Senior Section */}
          <div className="flex-1 bg-indigo-50/30 hover:bg-indigo-50/80 transition-colors p-8 relative group flex flex-col">
            <div className="w-16 h-16 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-600/20 mb-6">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">Senior Portal</h2>
            <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-1">
              List your old textbooks and lab equipment for sale, mentor junior students, and share your academic experience on the forum.
            </p>
            <div className="space-y-3">
              <button
                onClick={() => handleRoleSelect('Senior', '2nd Year')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-between transition-all shadow-md shadow-indigo-600/20 group-hover:-translate-y-0.5"
              >
                <span>Login as 2nd Year</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleRoleSelect('Senior', '3rd Year (Senior)')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-between transition-all shadow-md shadow-indigo-600/20 group-hover:-translate-y-0.5"
              >
                <span>Login as 3rd Year</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleRoleSelect('Senior', '4th Year (Senior)')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-between transition-all shadow-md shadow-indigo-600/20 group-hover:-translate-y-0.5"
              >
                <span>Login as 4th Year</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
