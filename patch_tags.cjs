const fs = require('fs');

const fixFile = (path) => {
  let content = fs.readFileSync(path, 'utf8');
  content = content.replace(/item\.tags\.length/g, '(item.tags || []).length');
  content = content.replace(/item\.tags\.map/g, '(item.tags || []).map');
  content = content.replace(/q\.tags\.some/g, '(q.tags || []).some');
  content = content.replace(/q\.tags\.map/g, '(q.tags || []).map');
  content = content.replace(/q\.tags\.length/g, '(q.tags || []).length');
  fs.writeFileSync(path, content);
};

fixFile('src/components/Marketplace/ItemDetailModal.tsx');
fixFile('src/components/Forum/ForumView.tsx');
fixFile('src/components/Forum/QuestionDetailModal.tsx');
