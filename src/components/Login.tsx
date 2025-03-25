// src/components/Login.tsx
import { useContext, useState, FormEvent, JSX } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';

function Login(): JSX.Element {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/accounts/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (data["account: "]) {
        setTimeout(async () => {
          await login(); 
          navigate("/home");
        }, 200); 
      } else {
        setError(data["error: "] || "Credenciales inválidas");
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Error del servidor');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input 
        type="text" 
        placeholder="Username" 
        value={username} 
        onChange={e => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
      />
      <button type="submit">Log in</button>
      <button type="button" onClick={() => navigate("/register")}>
        Register
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
}

export default Login;
