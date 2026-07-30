const fs = require('fs');
let code = fs.readFileSync('src/components/Auth/LoginView.tsx', 'utf8');

code = code.replace(
`  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUserId, setLoginUserId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUserId, setLoginUserId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');`,
`  const [registerPassword, setRegisterPassword] = useState('');
  const [loginUserId, setLoginUserId] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');`
);

fs.writeFileSync('src/components/Auth/LoginView.tsx', code);
