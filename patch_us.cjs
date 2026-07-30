const fs = require('fs');
let code = fs.readFileSync('src/components/Auth/UserSwitcherModal.tsx', 'utf8');

code = code.replace(
`  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200');`,
`  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200');
  const [registerPassword, setRegisterPassword] = useState('');`
);

code = code.replace(
`    if (!name.trim() || !email.trim()) return;`,
`    if (!name.trim() || !email.trim() || !registerPassword.trim()) return;`
);

code = code.replace(
`      badges: ['Custom Account', role === 'Junior' ? 'Freshie' : 'Senior Student']
    };`,
`      badges: ['Custom Account', role === 'Junior' ? 'Freshie' : 'Senior Student'],
      password: registerPassword
    };`
);

code = code.replace(
`            <div>
              <label className="font-bold text-slate-600">Email Address *</label>
              <input
                type="email"
                placeholder="e.g. student@hostel.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-slate-100 border border-slate-300 rounded-xl p-2.5 text-slate-900 mt-1"
              />
            </div>`,
`            <div>
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
            </div>`
);

fs.writeFileSync('src/components/Auth/UserSwitcherModal.tsx', code);
