const fs = require('fs');
const path = require('path');

const directory = './src';

const replacements = [
  { regex: /bg-slate-950\/80/g, replacement: 'bg-white/80' },
  { regex: /bg-slate-950\/60/g, replacement: 'bg-slate-50/60' },
  { regex: /bg-slate-950\/50/g, replacement: 'bg-slate-50/50' },
  { regex: /bg-slate-950\/40/g, replacement: 'bg-slate-50/40' },
  { regex: /bg-slate-950\/30/g, replacement: 'bg-slate-50/30' },
  { regex: /bg-slate-900\/50/g, replacement: 'bg-slate-50/50' },
  { regex: /bg-slate-900\/80/g, replacement: 'bg-white/80' },
  { regex: /bg-slate-900\/90/g, replacement: 'bg-white/90' },
  { regex: /bg-slate-800\/60/g, replacement: 'bg-slate-100/60' },
  { regex: /bg-slate-800\/50/g, replacement: 'bg-slate-100/50' },
  { regex: /bg-slate-800\/40/g, replacement: 'bg-slate-100/40' },
  { regex: /bg-slate-800\/80/g, replacement: 'bg-slate-100/80' },
  { regex: /bg-slate-800\/90/g, replacement: 'bg-slate-100/90' },
  { regex: /border-slate-800\/60/g, replacement: 'border-slate-200/60' },
  { regex: /border-slate-800\/80/g, replacement: 'border-slate-200/80' },
  { regex: /border-slate-700\/60/g, replacement: 'border-slate-300/60' },
  { regex: /border-slate-700\/80/g, replacement: 'border-slate-300/80' },
  { regex: /bg-slate-950/g, replacement: 'bg-slate-50' },
  { regex: /bg-slate-900/g, replacement: 'bg-white' },
  { regex: /bg-slate-800/g, replacement: 'bg-slate-100' },
  { regex: /bg-slate-700/g, replacement: 'bg-slate-200' },
  { regex: /border-slate-800/g, replacement: 'border-slate-200' },
  { regex: /border-slate-700/g, replacement: 'border-slate-300' },
  { regex: /text-slate-100/g, replacement: 'text-slate-900' },
  { regex: /text-slate-200/g, replacement: 'text-slate-800' },
  { regex: /text-slate-300/g, replacement: 'text-slate-600' },
  { regex: /text-slate-400/g, replacement: 'text-slate-500' },
  { regex: /text-slate-500/g, replacement: 'text-slate-400' },
  { regex: /text-white/g, replacement: 'text-slate-900' },
  { regex: /text-slate-950/g, replacement: 'text-white' },
  { regex: /bg-emerald-500\/10/g, replacement: 'bg-indigo-600/10' },
  { regex: /bg-emerald-500\/20/g, replacement: 'bg-indigo-600/10' },
  { regex: /border-emerald-500\/30/g, replacement: 'border-indigo-600/20' },
  { regex: /border-emerald-500\/50/g, replacement: 'border-indigo-600/40' },
  { regex: /emerald-500/g, replacement: 'indigo-600' },
  { regex: /emerald-400/g, replacement: 'indigo-600' },
  { regex: /emerald-300/g, replacement: 'indigo-500' },
  { regex: /hover:bg-slate-800/g, replacement: 'hover:bg-slate-100' },
  { regex: /hover:bg-slate-700/g, replacement: 'hover:bg-slate-200' },
  { regex: /hover:text-white/g, replacement: 'hover:text-slate-900' },
  { regex: /divide-slate-800/g, replacement: 'divide-slate-200' },
  { regex: /ring-emerald-500/g, replacement: 'ring-indigo-600' },
  { regex: /text-slate-950/g, replacement: 'text-white' },
  // fix specific for AIMentorView where it was already using indigo in dark mode
  { regex: /bg-gradient-to-r from-indigo-950 via-slate-900 to-indigo-900/g, replacement: 'bg-gradient-to-r from-indigo-50 via-white to-indigo-100' },
  { regex: /bg-indigo-950\/40/g, replacement: 'bg-indigo-50/40' },
  { regex: /bg-indigo-600 text-white/g, replacement: 'bg-indigo-600 text-white' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      processDirectory(filePath);
    } else if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
      let content = fs.readFileSync(filePath, 'utf8');
      for (const { regex, replacement } of replacements) {
        content = content.replace(regex, replacement);
      }
      fs.writeFileSync(filePath, content, 'utf8');
    }
  }
}

processDirectory(directory);
console.log('Theme updated successfully.');
