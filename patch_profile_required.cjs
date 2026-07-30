const fs = require('fs');
let code = fs.readFileSync('src/components/Profile/ProfileView.tsx', 'utf8');
code = code.replace(/<select required/g, '<select');
fs.writeFileSync('src/components/Profile/ProfileView.tsx', code);
