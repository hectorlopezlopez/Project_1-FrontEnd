import { JSX, useContext, useEffect, useState, FormEvent, ChangeEvent } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";
import Swal from 'sweetalert2';
import { Loan } from "../models/Loan";
import { updateLoan, updateUserLoan } from "../services/loan";

function UpdateLoan(): JSX.Element{
    const navigate = useNavigate();
    const {loan, setLoan, user} = useContext(AuthContext);
    const[formData, setFormData] = useState<Loan | null>(null);
    const [message, setMessage] = useState<string>("");

    useEffect(()=>{
        if(loan){
            setFormData({...loan});
        }
    },[loan]);

    const handleChange = (e: ChangeEvent <HTMLInputElement>) => {
        const {name, value} =e.target;
        if(formData){
            setFormData({...formData, [name]: value});
        }
    };
const handleSubmit = async(e:FormEvent<HTMLFormElement>) =>{
    e.preventDefault();
    if(!formData)return;
    try{
        const res = await updateLoan(user?.idUser,formData)
        const dataAd = await res.json();
        if(dataAd?.loanId){
            setLoan(dataAd);
            Swal.fire({
                toast:true, 
                      title: 'Success!',
                      text: 'Your loan has been updated successfully, redirecting to home.',
                      icon: 'success',
                      showConfirmButton: false,
                      confirmButtonText: 'Accept',
                      timer: 1000,
                           timerProgressBar: true,
            });
            setTimeout(()=>{
                navigate("/home");
            },2000);
        }else{
            setMessage(dataAd["error: "] || "There's a problem with the updating");
        }
    } catch(err){
        setMessage("Error on processing the data");
    }
};
return (
    <div>
  <h2>Update my Address</h2>
  {formData ? (
    <form onSubmit={handleSubmit}>
        <input
            name="Status reason: "
            value={formData.statusReason}
            onChange={handleChange}
            placeholder="Status reason: "
            required
        />
        <input
            name="Manager update: "
            value={formData.managerUpdate}
            onChange={handleChange}
            placeholder="Manager update: "
            required
        />
        <input
            name="Loan status: "
            value={formData.loanStatus?.loanStatusId}
            onChange={handleChange}
            placeholder="City"
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

export default UpdateLoan;