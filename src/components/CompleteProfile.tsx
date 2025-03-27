// src/components/CompleteProfile.tsx
import { useState, useContext, useEffect, ChangeEvent, FormEvent, JSX } from 'react';
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { createUserProfile } from '../services/user';
import Swal from 'sweetalert2';
import './CompleteProfile.css';

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

    // const response = await fetch("http://localhost:8080/users", {
    //   method: 'POST',
    //   headers: { "Content-Type": "application/json" },
    //   credentials: 'include',
    //   body: JSON.stringify({
    //     firstName,
    //     lastName,
    //     email,
    //     createdAt,
    //     phone,
    //     account: { accountId }
    //   })
    // });

    const response = await createUserProfile( {firstName,
      lastName,
      email,
      createdAt,
      phone,
      account: { accountId }});

    if (response.ok) {
      Swal.fire({
               toast:true,
               title: 'Success!',
               text: 'Your profile has been created successfully.',
               icon: 'success',
               showConfirmButton: false,
               confirmButtonText: 'Accept',  
               timer: 1000,
               timerProgressBar: true,
             });
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

  return  (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>
      <form className="complete-form" onSubmit={handleCreateUser}>
        <h3>Complete your profile</h3>

        <label htmlFor="name">Name</label>
        <input
          id="name"
          placeholder="Name"
          value={firstName}
          onChange={handleChange(setFirstName)}
          required
        />

        <label htmlFor="lastname">Last name</label>
        <input
          id="lastname"
          placeholder="Last name"
          value={lastName}
          onChange={handleChange(setLastName)}
          required
        />

        <label htmlFor="email">Mail</label>
        <input
          id="email"
          placeholder="Mail"
          value={email}
          onChange={handleChange(setEmail)}
          required
        />

        <label htmlFor="createdAt">Date of creation</label>
        <input
          type="date"
          id="createdAt"
          name="trip-start"
          value={createdAt}
          min="2018-01-01"
          max="2025-12-31"
          onChange={handleChange(setCreatedAt)}
          required
        />

        <label htmlFor="phone">Phone</label>
        <input
          id="phone"
          placeholder="Phone"
          value={phone}
          onChange={handleChange(setPhone)}
          required
        />

        <button type="submit">Save profile</button>

        {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}
      </form>
    </>
  );
}

export default CompleteProfile;
