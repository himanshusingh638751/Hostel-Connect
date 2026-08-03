const fs = require('fs');
let code = fs.readFileSync('src/components/Navigation.tsx', 'utf8');
code = code.replace(`item.id !== 'ai-mentor' && item.id !== 'seniors'`, `item.id !== 'seniors'`);
fs.writeFileSync('src/components/Navigation.tsx', code);
