const fs = require('fs');
let code = fs.readFileSync('src/components/Navigation.tsx', 'utf8');
code = code.replace(`  // Logic separation: Seniors do not need AI Mentor or Senior Contacts`, `  // Logic separation: Seniors do not need Senior Contacts`);
fs.writeFileSync('src/components/Navigation.tsx', code);
