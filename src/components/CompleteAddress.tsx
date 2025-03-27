import { useState, useContext, useEffect, ChangeEvent, JSX } from 'react';
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { createAddress} from '../services/addressService';
import './CompleteProfile.css';
import Swal from 'sweetalert2';

function CompleteAddress(): JSX.Element{
    const { hasAddress } = useContext(AuthContext);
    const navigate = useNavigate();

    const [country, setCountry] = useState<string>('');
    const [state, setState] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [street, setStreet] = useState<string>('');
    const [streetNum, setStreetNum] = useState<string>('');
    const [zip, setZip] = useState<string>('');
    const [addressCreated, setAddressCreated] = useState<boolean>(false);

    const handleCreateAddress = async () => {
        const address = {
            country,
            state, 
            city,
            street,
            streetNum,
            zip
        };
        if(!hasAddress){
            await createAddress(address);
            Swal.fire({
                toast:true,
                title: 'Success!',
                text: 'Your address has been created successfully.',
                icon: 'success',
                showConfirmButton: false,
                confirmButtonText: 'Accept',
                timer: 1000,
                     timerProgressBar: true,
              });
            setAddressCreated(true);
        } else{
            console.error("This user already has address");
        }
    }

    useEffect(() => {
        if(hasAddress && addressCreated){
            setTimeout(() => {
                navigate("/home", { replace: true });
              }, 2000);
              
            // navigate("/home", {replace: true});
        }
    },[hasAddress, addressCreated, navigate]);

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
        (e: ChangeEvent<HTMLInputElement>) => setter(e.target.value);

    return (
        <>
        <div className="background">
          <div className="shape"></div>
          <div className="shape"></div>
        </div>
      
        <form className="complete-form" onSubmit={handleCreateAddress}>
          <h3>Address</h3>
      
          <label htmlFor="country">Country</label>
          <input
            id="country"
            value={country}
            onChange={handleChange(setCountry)}
            required
            placeholder="Country"
          />
      
          <label htmlFor="state">State</label>
          <input
            id="state"
            value={state}
            onChange={handleChange(setState)}
            required
            placeholder="State"
          />
      
          <label htmlFor="city">City</label>
          <input
            id="city"
            value={city}
            onChange={handleChange(setCity)}
            required
            placeholder="City"
          />
      
          <label htmlFor="street">Street</label>
          <input
            id="street"
            value={street}
            onChange={handleChange(setStreet)}
            required
            placeholder="Street"
          />
      
          <label htmlFor="streetNum">Street Number</label>
          <input
            id="streetNum"
            value={streetNum}
            onChange={handleChange(setStreetNum)}
            required
            placeholder="Street Number"
          />
      
          <label htmlFor="zip">ZIP</label>
          <input
            id="zip"
            value={zip}
            onChange={handleChange(setZip)}
            required
            placeholder="ZIP Code"
          />
      
          <button type="submit">Save profile</button>
          <button type="button" onClick={() => navigate("/home")}>Back</button>
        </form>
      </>
      
    );
}

export default CompleteAddress;