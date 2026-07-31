const fs = require('fs');

function replaceInFile(filePath) {
  let code = fs.readFileSync(filePath, 'utf8');
  code = code.replace(/console\.error\(/g, 'console.warn(');
  fs.writeFileSync(filePath, code);
}

replaceInFile('src/components/Marketplace/CreateListingModal.tsx');
replaceInFile('src/components/Auth/LoginView.tsx');
replaceInFile('src/components/Auth/UserSwitcherModal.tsx');
replaceInFile('src/App.tsx');
