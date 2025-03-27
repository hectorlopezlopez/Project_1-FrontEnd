// src/components/UpdateMyProfile.tsx
import { JSX, useContext, useEffect, useState, FormEvent, ChangeEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import { updateMyAddress } from "../services/addressService";
import { Address } from "../models/Address";
import Swal from 'sweetalert2';

function UpdateAddress(): JSX.Element {
    const navigate = useNavigate();
    const { address, setAddress } = useContext(AuthContext);
    const [formData, setFormData] = useState<Address | null>(null);
    const [message, setMessage] = useState<string>("");

    useEffect(()=>{
        if(address){
            setFormData({...address});
        }
    }, [address]); 

    const handleChange = (e: ChangeEvent <HTMLInputElement>) =>{
        const {name, value} = e.target;
        if (formData){
            setFormData({...formData, [name]: value});
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!formData) return;
    
        try {
          const res = await updateMyAddress(formData);
          const dataAd = await res.json();
          if (dataAd?.addressId) {
            setAddress(dataAd);
             Swal.fire({
                      toast:true,
                      title: 'Success!',
                      text: 'Your address has been updated successfully, redirecting to home.',
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
            //await login(); 
          } else {
            setMessage(dataAd["error: "] || "There's a problem with the updating");
          }
        } catch (err) {
          setMessage("Error on processing the data");
        }
    };
    
    return (
        <div>
      <h2>Update my Address</h2>
      {formData ? (
        <form onSubmit={handleSubmit}>
            <input
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Country"
                required
            />
            <input
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="State"
                required
            />
            <input
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                required
            />
            <input
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Street"
                required
            />
            <input
                name="streetNum"
                value={formData.streetNum}
                onChange={handleChange}
                placeholder="Street Number"
                required
            />
            <input
                name="zip"
                value={formData.zip}
                onChange={handleChange}
                placeholder="Zip"
                required
            />
            <button type="submit">Save changes</button>
            <button type="button" onClick={(e) => { e.preventDefault(); navigate("/home"); }}>Cancel</button>
        </form>
      ) : (
        <p>Loading data...</p>
      )}
      {message && <p>{message}</p>}
    </div>
    );

}

export default UpdateAddress;