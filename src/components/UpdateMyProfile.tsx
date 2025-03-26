// src/components/UpdateMyProfile.tsx
import { JSX, useContext, useEffect, useState, FormEvent, ChangeEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import { User } from "../models/User";
import { updateUser } from "../services/user";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';

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

    const res = await updateUser(formData);

    try {
      const data = await res.json();
      if (data?.idUser) {
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

  return (
    <div>
      <h2>Update my profile</h2>
      {formData ? (
        <form onSubmit={handleSubmit}>
          <input
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last name"
            required
          />
          <input
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
          <input
            name="createdAt"
            value={formData.createdAt}
            onChange={handleChange}
            placeholder="Date of creation"
            required
          />
          <button type="submit">Save changes</button>
        </form>
      ) : (
        <p>Loading data...</p>
      )}
      {message && <p>{message}</p>}
    </div>
  );
}

export default UpdateMyProfile;
