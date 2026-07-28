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
              className="flex items-center gap-1.5 p-2 -ml-2 pr-3 rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors font-semibold text-sm"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
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
                    <div className="text-[10px] text-indigo-600 font-bold mt-1 tracking-wide uppercase">
                      {usr.department} • {usr.hostelBlock}
                    </div>
                    <div className="text-xs text-slate-500">{usr.email}</div>
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
            <button
              onClick={() => handleRoleSelect('Senior')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-between transition-all shadow-md shadow-indigo-600/20 group-hover:-translate-y-0.5"
            >
              <span>Login as Senior</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
