const fs = require('fs');

const replaceInFile = (file, search, replace) => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(search, replace);
  fs.writeFileSync(file, content);
};

const selectHTML = `<select
                    value={hostelBlock}
                    onChange={(e) => setHostelBlock(e.target.value)}
                    required
                    className="w-full bg-slate-100 border border-slate-300 rounded-xl p-3 text-slate-900 mt-1"
                  >
                    <option value="" disabled>Select Hostel Block</option>
                    <option value="Kadamb Boys Hostel">Kadamb Boys Hostel</option>
                    <option value="Gulmohar Boys Hostel">Gulmohar Boys Hostel</option>
                    <option value="Shirish Boys Hostel">Shirish Boys Hostel</option>
                    <option value="Palash Boys Hostel">Palash Boys Hostel</option>
                    <option value="Aparajita Girls Hostel">Aparajita Girls Hostel</option>
                  </select>`;

const selectHTMLUserSwitcher = selectHTML.replace(/p-3/g, 'p-2.5');
const selectHTMLProfile = selectHTMLUserSwitcher.replace(/p-2\.5/g, 'text-xs p-2.5').replace(/<select/g, '<select required'); // Not really needed to be required but ok

let loginContent = fs.readFileSync('src/components/Auth/LoginView.tsx', 'utf8');
loginContent = loginContent.replace(/const \[hostelBlock, setHostelBlock\] = useState\('Block B2 \(Boys\)'\);/, "const [hostelBlock, setHostelBlock] = useState('');");
loginContent = loginContent.replace(/<input\s+type="text"\s+placeholder="e\.g\. Block B2"\s+value=\{hostelBlock\}\s+onChange=\{\(e\) => setHostelBlock\(e\.target\.value\)\}\s+className="w-full bg-slate-100 border border-slate-300 rounded-xl p-3 text-slate-900 mt-1"\s+\/>/, selectHTML);
fs.writeFileSync('src/components/Auth/LoginView.tsx', loginContent);

let userSwitcherContent = fs.readFileSync('src/components/Auth/UserSwitcherModal.tsx', 'utf8');
userSwitcherContent = userSwitcherContent.replace(/const \[hostelBlock, setHostelBlock\] = useState\('Block B2 \(Boys\)'\);/, "const [hostelBlock, setHostelBlock] = useState('');");
userSwitcherContent = userSwitcherContent.replace(/<input\s+type="text"\s+value=\{hostelBlock\}\s+onChange=\{\(e\) => setHostelBlock\(e\.target\.value\)\}\s+className="w-full bg-slate-100 border border-slate-300 rounded-xl p-2\.5 text-slate-900 mt-1"\s+\/>/, selectHTMLUserSwitcher);
fs.writeFileSync('src/components/Auth/UserSwitcherModal.tsx', userSwitcherContent);

let profileContent = fs.readFileSync('src/components/Profile/ProfileView.tsx', 'utf8');
profileContent = profileContent.replace(/<input type="text" value=\{hostelBlock\} onChange=\{\(e\) => setHostelBlock\(e\.target\.value\)\} className="w-full bg-slate-100 border border-slate-300 text-xs rounded-xl p-2\.5 text-slate-900 mt-1" \/>/, selectHTMLProfile);
fs.writeFileSync('src/components/Profile/ProfileView.tsx', profileContent);

