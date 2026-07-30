const fs = require('fs');
let app = fs.readFileSync('src/components/Marketplace/MarketplaceView.tsx', 'utf8');

app = app.replace(/const matchesTags = item\.tags\.some/g, 'const matchesTags = (item.tags || []).some');
app = app.replace(/item\.tags\.map/g, '(item.tags || []).map');

fs.writeFileSync('src/components/Marketplace/MarketplaceView.tsx', app);
