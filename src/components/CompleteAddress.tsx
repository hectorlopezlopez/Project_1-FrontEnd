import { useState, useContext, useEffect, ChangeEvent, FormEvent, JSX } from 'react';
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { createAddress} from '../services/addressService';

function CompleteAddress(){
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
            setAddressCreated(true);
        } else{
            console.error("This user already has address");
        }
    }

    useEffect(() => {
        if(hasAddress && addressCreated){
            navigate("/home", {replace: true});
        }
    },[hasAddress, addressCreated, navigate]);

    const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
        (e: ChangeEvent<HTMLInputElement>) => setter(e.target.value);

    return (
        <>
            <h2>Address</h2>
                <form onSubmit = {handleCreateAddress}>
                <input
                    value={country}
                    onChange={handleChange(setCountry)} required
                    placeholder="Country" />
                <input
                    value={state}
                    onChange={handleChange(setState)} required
                    placeholder="State" />
                <input
                    value={city}
                    onChange={handleChange(setCity)} required
                    placeholder="City" />
                <input
                    value={street}
                    onChange={handleChange(setStreet)} required
                    placeholder="State" />
                <input
                    value={streetNum}
                    onChange={handleChange(setStreetNum)} required
                    placeholder="State" />
                <input
                    value={zip}
                    onChange={handleChange(setZip)} required
                    placeholder="Zip" />
                <button type="submit">Save profile</button>
            </form>
            
        </>
    );
}

export default CompleteAddress;