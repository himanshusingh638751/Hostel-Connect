const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');

code = code.replace(`import { AIMentorView } from './components/AIMentor/AIMentorView';\n`, '');

const targetBlock = `{activeTab === 'ai-mentor' && (
          <AIMentorView currentUser={currentUser} />
        )}`;
code = code.replace(targetBlock, '');

fs.writeFileSync('src/App.tsx', code);
