const fs = require('fs');
let app = fs.readFileSync('src/App.tsx', 'utf8');

const regex = /const saved = localStorage\.getItem\('([^']+)'\);\n\s*return saved \? JSON\.parse\(saved\) : (\[\]|\{\}|\['item_1', 'item_3'\]);/g;

app = app.replace(regex, (match, key, def) => {
  return `const saved = localStorage.getItem('${key}');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed) return parsed;
      } catch (e) {}
    }
    return ${def};`;
});

fs.writeFileSync('src/App.tsx', app);
