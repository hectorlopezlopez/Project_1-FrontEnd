// src/components/UpdateMyProfile.tsx
import { JSX, useContext, useEffect, useState, FormEvent, ChangeEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "../models/User";
import { updateUser } from "../services/user";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';
import './CompleteProfile.css'; 

function UpdateMyProfile(): JSX.Element {
    const navigate = useNavigate();
  const { user, login } = useContext(AuthContext);
  const [formData, setFormData] = useState<User | null>(null);
  const [message, setMessage] = useState<string>("");
  

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (formData) {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData) return;

    const { idUser, ...formDataWithoutId } = formData;
    console.log(formDataWithoutId);

    const res = await updateUser(formDataWithoutId);

    try {
      const data = await res.json();
      if (data?.idUser) {
        console.log("Api:");
        console.log(data);
         Swal.fire({
                  toast:true,
                  title: 'Success!',
                  text: 'Your account has been updated successfully, redirecting to home.',
                  icon: 'success',
                  showConfirmButton: false,
                  confirmButtonText: 'Accept',
                  timer: 1000,
                       timerProgressBar: true,
                });
        // setMessage("User updated succesfully, redirecting to home");
        setTimeout(() => {
            navigate("/home");
          }, 2000); 
        await login(); 
      } else {
        setMessage(data["error: "] || "There's a prblem with updating the errro");
      }
    } catch (err) {
      setMessage("Error on processing the data");
    }
  };

  return  (
    <>
      <div className="background">
        <div className="shape"></div>
        <div className="shape"></div>
      </div>

      <form className="complete-form" onSubmit={handleSubmit}>
        <h3>Update your profile</h3>

        {formData ? (
          <>
            <label htmlFor="firstName">Name</label>
            <input
              name="firstName"
              id="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Name"
              required
            />

            <label htmlFor="lastName">Last name</label>
            <input
              name="lastName"
              id="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last name"
              required
            />

            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
            />

            <label htmlFor="phone">Phone</label>
            <input
              name="phone"
              id="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              required
            />

            <label htmlFor="createdAt">Date of creation</label>
            <input
              name="createdAt"
              id="createdAt"
              type="date"
              value={formData.createdAt}
              onChange={handleChange}
              required
            />

            <button type="submit">Save changes</button>
          </>
        ) : (
          <p>Loading data...</p>
        )}

        {message && <p style={{ marginTop: '15px', color: '#333' }}>{message}</p>}
      </form>
    </>
  );
}

export default UpdateMyProfile;
