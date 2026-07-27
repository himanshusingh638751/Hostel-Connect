const fs = require('fs');
const path = require('path');

const directory = './src';

const replacements = [
  { regex: /text-teal-300/g, replacement: 'text-teal-700' },
  { regex: /text-teal-400/g, replacement: 'text-teal-600' },
  { regex: /text-amber-300/g, replacement: 'text-amber-700' },
  { regex: /text-indigo-300/g, replacement: 'text-indigo-700' },
  { regex: /text-emerald-300/g, replacement: 'text-emerald-700' },
  { regex: /text-slate-400/g, replacement: 'text-slate-500' },
  { regex: /border-slate-800\/60/g, replacement: 'border-slate-200/60' },
  { regex: /text-white/g, replacement: 'text-slate-900' },
  // check for `text-slate-100` that might have been changed to `text-slate-900`
  { regex: /bg-slate-950\/50/g, replacement: 'bg-slate-50/50' },
  { regex: /bg-slate-950/g, replacement: 'bg-slate-50' },
  // fix any remaining issues 
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
console.log('Fixes applied successfully.');
