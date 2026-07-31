const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(
`  const safeSetStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.error(\`Error saving \${key} to localStorage:\`, e);
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        alert('Storage quota exceeded! The image you uploaded might be too large. Please use a smaller image or an image URL.');
      }
    }
  };`,
`  const safeSetStorage = (key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn(\`Storage quota exceeded for \${key}. Try clearing browser data or using smaller images.\`);
      if (e instanceof DOMException && e.name === 'QuotaExceededError') {
        alert('Storage quota exceeded! The image you uploaded might be too large. Please use a smaller image or an image URL.');
      }
    }
  };`
);

fs.writeFileSync('src/App.tsx', code);
