// src/components/CompleteProfile.tsx
import { useState, useContext, useEffect, ChangeEvent, FormEvent, JSX } from 'react';
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';

function CompleteProfile(): JSX.Element {
  const { login, accountId, hasUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [createdAt, setCreatedAt] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [profileCreated, setProfileCreated] = useState<boolean>(false); 

  const handleCreateUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/users", {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      credentials: 'include',
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        createdAt,
        phone,
        account: { accountId }
      })
    });

    if (response.ok) {
      await login(); 
      setProfileCreated(true); 
    } else {
      setError("Error in creating the user profile.");
    }
  };

  useEffect(() => {
    if (hasUserProfile && profileCreated) {
      navigate("/home", { replace: true });
    }
  }, [hasUserProfile, profileCreated, navigate]);

  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: ChangeEvent<HTMLInputElement>) => setter(e.target.value);

  return (
    <div>
      <h2>Complete your profile</h2>
      <form onSubmit={handleCreateUser}>
        <input placeholder="Name" value={firstName} onChange={handleChange(setFirstName)} required />
        <input placeholder="Last name" value={lastName} onChange={handleChange(setLastName)} required />
        <input placeholder="Mail" value={email} onChange={handleChange(setEmail)} required />
        <input placeholder="Date of creation" value={createdAt} onChange={handleChange(setCreatedAt)} required />
        <input placeholder="Phone" value={phone} onChange={handleChange(setPhone)} required />
        <button type="submit">Save profile</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default CompleteProfile;
