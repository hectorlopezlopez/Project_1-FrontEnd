// src/components/Register.tsx
import { useContext, useEffect, useState, ChangeEvent, FormEvent, JSX } from 'react';
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { loginRequest, registerRequest } from '../services/authservice';
import Swal from 'sweetalert2';
import './Login.css';

interface Role {
  roleId: number;
}

interface RegisterFormData {
  username: string;
  password: string;
  role: Role;
}

function Register(): JSX.Element {
  const { login, authStatus } = useContext(AuthContext); 
  const [formData, setFormData] = useState<RegisterFormData>({
    username: '',
    password: '',
    role: { roleId: 1 }
  });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [pendingRedirect, setPendingRedirect] = useState<boolean>(false); 
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      // const response = await fetch("http://localhost:8080/auth/accounts/register", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify(formData)
      // });

      const response = await registerRequest(formData);

      let data;
      try {
        data = await response.json();
      } catch (err) {
        const text = await response.text();
        console.error("Respuesta no JSON:", text);
        setError(text || "Respuesta no válida del servidor");
        return;
      }

      if (data["account: "]) {
        Swal.fire({
          toast:true,
          title: 'Success!',
          text: 'Your account has been created successfully.',
          icon: 'success',
          showConfirmButton: false,
          confirmButtonText: 'Accept',
          timer: 1000,
               timerProgressBar: true,
        });
        setSuccess("Account created successfully.");

        // const loginRes = await fetch("http://localhost:8080/auth/accounts/login", {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   credentials: "include",
        //   body: JSON.stringify({
        //     username: formData.username,
        //     password: formData.password
        //   })
        // });

        const loginRes = await loginRequest(formData.username, formData.password);

        if (loginRes.ok) {
          await login(); 
          setPendingRedirect(true); 
        } else {
          setError("Login authentication failed.");
        }
      } else {
        Swal.fire({
          toast:true,
          title: 'ERROR!',
          text: 'This account already exists.',
          icon: 'error',
          showConfirmButton: false,
          confirmButtonText: 'Accept',
          timer: 1000,
               timerProgressBar: true,
        });
        setError(data["error: "] || "No se pudo crear la cuenta");
      }
    } catch (err) {
      console.error("Error en el registro:", err);
      setError("Error del servidor");
    }
  };

  useEffect(() => {
    if (authStatus === 'authenticated' && pendingRedirect) {
      navigate("/complete-profile");
    }
  }, [authStatus, pendingRedirect, navigate]);

  return (
    <>
    <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
    </div>
    <form className="login-form" onSubmit={handleRegister}>
      <h3>Register</h3>

      <label htmlFor="username">Username</label>
      <input
        type="text"
        name="username"
        placeholder="Name of user"
        value={formData.username}
        onChange={handleChange}
        required
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />

      <button type="submit">Register</button>

      {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
      {success && <p style={{ color: 'green', marginTop: '15px' }}>{success}</p>}
    </form>
  </>
  );
}

export default Register;
