const fs = require('fs');
let code = fs.readFileSync('src/components/Auth/LoginView.tsx', 'utf8');

const regFormStr = `<form onSubmit={handleRegisterSubmit} className="space-y-4 text-sm animate-in fade-in slide-in-from-right-8 duration-300">
              <div>
                <label className="font-bold text-slate-600">Student Full Name *</label>`;

const newRegFormStr = `<form onSubmit={handleRegisterSubmit} className="space-y-4 text-sm animate-in fade-in slide-in-from-right-8 duration-300">
              <div>
                <label className="font-bold text-slate-600">Student Full Name *</label>`;

code = code.replace(
`              <div>
                <label className="font-bold text-slate-600">Email Address *</label>
                <input
                  type="email"
                  placeholder="e.g. student@hostel.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-100 border border-slate-300 rounded-xl p-3 text-slate-900 mt-1"
                />
              </div>`,
`              <div>
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
              </div>`
);

fs.writeFileSync('src/components/Auth/LoginView.tsx', code);
