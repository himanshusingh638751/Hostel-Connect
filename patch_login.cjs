const fs = require('fs');
let code = fs.readFileSync('src/components/Auth/LoginView.tsx', 'utf8');

code = code.replace("  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200');", 
`  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUserId, setLoginUserId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');`);

code = code.replace(
`  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setShowRegisterForm(false);
  };`,
`  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setShowRegisterForm(false);
    setLoginError('');
  };`
);

code = code.replace(
`    const newUser: User = {
      id: \`usr_\${Date.now()}\`,
      name: name.trim(),`,
`    if (!registerPassword.trim()) return;
    const newUser: User = {
      id: \`usr_\${Date.now()}\`,
      name: name.trim(),`
);

code = code.replace(
`      verifiedStudent: true,
      badges: ['Verified Student', isSenior ? 'Senior Student' : 'Freshie 2026']
    };`,
`      verifiedStudent: true,
      badges: ['Verified Student', isSenior ? 'Senior Student' : 'Freshie 2026'],
      password: registerPassword
    };`
);

fs.writeFileSync('src/components/Auth/LoginView.tsx', code);

code = fs.readFileSync('src/components/Auth/LoginView.tsx', 'utf8');

const oldLoginForm = `            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 no-scrollbar animate-in fade-in slide-in-from-right-8 duration-300">
              <div className="space-y-3">
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
              
              <button
                onClick={() => setShowRegisterForm(true)}
                className="w-full py-4 rounded-2xl border border-dashed border-slate-300 hover:border-indigo-600/40 text-sm text-slate-600 hover:text-indigo-600 font-bold flex items-center justify-center gap-2 transition-all"
              >
                <UserPlus className="w-4 h-4" />
                Register New {selectedRole} Account
              </button>
            </div>`;

const newLoginForm = `            <div className="space-y-4 animate-in fade-in slide-in-from-right-8 duration-300">
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
            </div>`;

code = code.replace(oldLoginForm, newLoginForm);
fs.writeFileSync('src/components/Auth/LoginView.tsx', code);
