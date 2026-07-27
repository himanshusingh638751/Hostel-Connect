const fs = require('fs');
const path = require('path');

const directory = './src';

const replacements = [
  { regex: /bg-indigo-600(.*?)text-slate-900/g, replacement: 'bg-indigo-600$1text-white' },
  { regex: /bg-indigo-600 text-slate-900/g, replacement: 'bg-indigo-600 text-white' },
  { regex: /bg-emerald-500(.*?)text-slate-950/g, replacement: 'bg-emerald-500$1text-white' },
  { regex: /bg-rose-500 text-slate-900/g, replacement: 'bg-rose-500 text-white' },
  { regex: /border-slate-900/g, replacement: 'border-white' },
  { regex: /bg-indigo-50/g, replacement: 'bg-slate-50' },
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
console.log('Button text color fixes applied successfully.');
