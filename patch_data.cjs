const fs = require('fs');
let app = fs.readFileSync('src/data/initialData.ts', 'utf8');

app = app.replace(/badges: \['Top Seller', 'Senior Mentor', 'Academic Helper'\]/g, "badges: ['Top Seller', 'Senior Mentor', 'Academic Helper'],\n    password: 'password123'");
app = app.replace(/badges: \['Freshie 2026', 'Active Buyer'\]/g, "badges: ['Freshie 2026', 'Active Buyer'],\n    password: 'password123'");
app = app.replace(/badges: \['Hostel Rep', 'Top Seller', 'Sports Captain'\]/g, "badges: ['Hostel Rep', 'Top Seller', 'Sports Captain'],\n    password: 'password123'");
app = app.replace(/badges: \['Moving Out Sale', 'Verified Senior'\]/g, "badges: ['Moving Out Sale', 'Verified Senior'],\n    password: 'password123'");

fs.writeFileSync('src/data/initialData.ts', app);
