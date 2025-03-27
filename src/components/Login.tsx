// src/components/Login.tsx
import { useContext, useState, FormEvent, JSX } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { loginRequest } from '../services/authservice';
import './Login.css';

import Swal from 'sweetalert2';
function Login(): JSX.Element {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // const response = await fetch('http://localhost:8080/auth/accounts/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   credentials: 'include',
      //   body: JSON.stringify({ username, password })
      // });

      const response = await loginRequest(username, password);

      const data = await response.json();

      if (data["account: "]) {
        setTimeout(async () => {
          Swal.fire({
            toast:true,
            position: 'top-end',
            title: 'Logged!',
            icon: 'success',
            showConfirmButton: false,
            confirmButtonText: 'Accept',
            timer: 1000,
                 timerProgressBar: true,
          });
          await login(); 
          navigate("/home");
        }, 200); 
      } else {
        Swal.fire({
                  toast:true,
                  title: 'ERROR!',
                  text: 'Invalid credentials.',
                  icon: 'error',
                  showConfirmButton: false,
                  confirmButtonText: 'Accept',
                  timer: 1000,
                       timerProgressBar: true,
                });
        setError(data["error: "] || "Invalid credentials");
      }
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Error del servidor');
    }
  };

  return (
    <>
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
    </div>
    <form className="login-form" onSubmit={handleLogin}>
      <h3>Login Here</h3>

      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        placeholder="Email or Phone"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Log In</button>

      <button
        type="button"
        onClick={() => navigate("/register")}
        style={{ marginTop: '10px' }}
      >
        Register
      </button>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
    </form>
  </>
    // <form  onSubmit={handleLogin}>
    //   <h2>Login</h2>
    //   <input 
    //     type="text" 
    //     placeholder="Username" 
    //     value={username} 
    //     onChange={e => setUsername(e.target.value)} 
    //   />
    //   <input 
    //     type="password" 
    //     placeholder="Password" 
    //     value={password} 
    //     onChange={e => setPassword(e.target.value)} 
    //   />
    //   <button type="submit">Log in</button>
    //   <button type="button" onClick={() => navigate("/register")}>
    //     Register
    //   </button>
    //   {error && <p style={{ color: 'red' }}>{error}</p>}


      
    // </form>
  );
}

export default Login;
