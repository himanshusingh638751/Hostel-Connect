const fs = require('fs');
let code = fs.readFileSync('src/components/Navigation.tsx', 'utf8');
code = code.replace(`    {
      id: 'ai-mentor',
      label: 'AI Hostel Advisor',
      shortLabel: 'AI Advisor',
      icon: Bot,
      badge: '24/7 AI',
      badgeColor: 'bg-slate-500/20 text-indigo-700 border-indigo-500/30'
    },`, '');
fs.writeFileSync('src/components/Navigation.tsx', code);
