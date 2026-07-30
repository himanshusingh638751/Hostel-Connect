const fs = require('fs');
let code = fs.readFileSync('src/components/Auth/LoginView.tsx', 'utf8');

code = code.replace(
`  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);`,
`  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);`
);

code = code.replace(
`  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setShowRegisterForm(false);
    setLoginError('');
  };`,
`  const handleRoleSelect = (role: UserRole, year?: string) => {
    setSelectedRole(role);
    if (year) setSelectedYear(year);
    setShowRegisterForm(false);
    setLoginError('');
  };`
);

code = code.replace(
`      year: isSenior ? '4th Year (Senior)' : '1st Year (Junior)',`,
`      year: isSenior ? (selectedYear || '4th Year (Senior)') : '1st Year (Junior)' as AcademicYear,`
);

code = code.replace(
`            <button
              onClick={() => handleRoleSelect('Senior')}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-between transition-all shadow-md shadow-indigo-600/20 group-hover:-translate-y-0.5"
            >
              <span>Login as Senior</span>
              <ChevronRight className="w-5 h-5" />
            </button>`,
`            <div className="space-y-3">
              <button
                onClick={() => handleRoleSelect('Senior', '2nd Year')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-between transition-all shadow-md shadow-indigo-600/20 group-hover:-translate-y-0.5"
              >
                <span>Login as 2nd Year</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleRoleSelect('Senior', '3rd Year (Senior)')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-between transition-all shadow-md shadow-indigo-600/20 group-hover:-translate-y-0.5"
              >
                <span>Login as 3rd Year</span>
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleRoleSelect('Senior', '4th Year (Senior)')}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-between transition-all shadow-md shadow-indigo-600/20 group-hover:-translate-y-0.5"
              >
                <span>Login as 4th Year</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>`
);

fs.writeFileSync('src/components/Auth/LoginView.tsx', code);
