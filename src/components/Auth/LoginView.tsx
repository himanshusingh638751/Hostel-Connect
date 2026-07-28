import React, { useState } from 'react';
import { User, UserRole } from '../../types';
import { SAMPLE_USERS } from '../../data/initialData';
import { Building2, UserCheck, GraduationCap, ChevronRight, ArrowLeft } from 'lucide-react';

interface LoginViewProps {
  onLogin: (user: User) => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
  };

  const handleUserLogin = (user: User) => {
    onLogin(user);
  };

  const availableUsers = SAMPLE_USERS.filter(u => 
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
              onClick={() => setSelectedRole(null)}
              className="p-2 -ml-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-extrabold text-slate-900 uppercase tracking-wider">
              Select {selectedRole} Account
            </h2>
          </div>
          
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 no-scrollbar animate-in fade-in slide-in-from-right-8 duration-300">
            {availableUsers.map((usr) => (
              <button
                key={usr.id}
                onClick={() => handleUserLogin(usr)}
                className="w-full text-left p-4 rounded-2xl border bg-slate-50/60 hover:bg-slate-100/80 border-slate-200 hover:border-indigo-600/40 transition-all flex items-center justify-between gap-3 group"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={usr.avatar}
                    alt={usr.name}
                    className="w-14 h-14 rounded-xl object-cover border border-slate-300 group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <div className="font-bold text-base text-slate-900">{usr.name}</div>
                    <div className="text-xs text-slate-500">{usr.email}</div>
                    <div className="text-[10px] text-indigo-600 font-bold mt-1 tracking-wide uppercase">
                      {usr.department} • {usr.hostelBlock}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Junior Section */}
      <div className="flex-1 bg-teal-50/50 flex flex-col items-center justify-center p-8 md:p-12 relative overflow-hidden group border-b md:border-b-0 md:border-r border-slate-200">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-teal-100/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="relative z-10 max-w-sm w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="w-20 h-20 rounded-3xl bg-teal-500 text-white flex items-center justify-center shadow-xl shadow-teal-500/20">
            <UserCheck className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Junior Gateway</h2>
            <p className="text-slate-600 mt-3 text-sm leading-relaxed">
              Access the campus marketplace to buy second-hand essentials, ask questions in the forum, and connect with verified senior mentors.
            </p>
          </div>
          <button
            onClick={() => handleRoleSelect('Junior')}
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-between transition-all shadow-lg shadow-teal-600/20 hover:shadow-xl hover:shadow-teal-600/30 hover:-translate-y-0.5"
          >
            <span>Login as Junior</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Senior Section */}
      <div className="flex-1 bg-indigo-50/50 flex flex-col items-center justify-center p-8 md:p-12 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-indigo-200/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
        <div className="relative z-10 max-w-sm w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="w-20 h-20 rounded-3xl bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/20">
            <GraduationCap className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Senior Portal</h2>
            <p className="text-slate-600 mt-3 text-sm leading-relaxed">
              List your old textbooks and lab equipment for sale, mentor junior students, and share your academic experience on the forum.
            </p>
          </div>
          <button
            onClick={() => handleRoleSelect('Senior')}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-between transition-all shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/30 hover:-translate-y-0.5"
          >
            <span>Login as Senior</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Brand Overlay Center */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex flex-col items-center pointer-events-none">
        <div className="w-16 h-16 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-slate-50">
          <Building2 className="w-7 h-7 text-slate-800" />
        </div>
      </div>
    </div>
  );
}
