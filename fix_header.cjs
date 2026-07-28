const fs = require('fs');
let code = fs.readFileSync('src/components/Header.tsx', 'utf8');

code = code.replace(
  /onSwitchUser: \(user: User\) => void;/,
  'onSwitchUser: (user: User) => void;\n  onLogout: () => void;'
);

code = code.replace(
  /onOpenUserSwitcher,\s+searchQuery/,
  'onOpenUserSwitcher,\n  onLogout,\n  searchQuery'
);

const buttonHtml = `<button
              onClick={onOpenUserSwitcher}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl bg-slate-100/90 hover:bg-slate-200/90 border border-slate-300 transition-all text-left group"
              title="Switch Active Student Account"
              id="btn-user-switcher"
            >
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-lg object-cover border border-slate-300 group-hover:scale-105 transition-transform"
              />
              <div className="hidden sm:block">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider leading-none mb-0.5">Active Student</div>
                <div className="text-xs font-bold text-slate-900 leading-none truncate max-w-[100px]">{currentUser.name}</div>
              </div>
            </button>
            <button
              onClick={onLogout}
              className="flex items-center justify-center p-2 rounded-xl bg-slate-100/90 hover:bg-rose-100/90 hover:text-rose-600 text-slate-600 border border-slate-300 hover:border-rose-300 transition-all"
              title="Logout"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
            </button>`;

code = code.replace(
  /<button\s+onClick=\{onOpenUserSwitcher\}[\s\S]*?<\/button>/,
  buttonHtml
);

fs.writeFileSync('src/components/Header.tsx', code);
