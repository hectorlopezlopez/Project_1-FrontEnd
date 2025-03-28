// src/components/UpdateLoan.tsx
import { useEffect, useState, FormEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Loan } from "../models/Loan";
import Swal from "sweetalert2";
import { getLoanById, updateLoan } from "../services/loan";
import "./CompleteProfile.css";

function UpdateLoan() {
  const { loanId } = useParams<{ loanId: string }>();
  const navigate = useNavigate();

  const [loanData, setLoanData] = useState<Loan | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState<boolean>(true); 
  const [loanStatus, setLoanStatus] = useState<{ id: number } | null>(null);
const [loanType, setLoanType] = useState<{ id: number } | null>(null);

  useEffect(() => {
  const fetchLoan = async () => {
    try {
      const res = await getLoanById(Number(loanId));
      const data = await res.json();

      if (!res.ok || data.error) {
        setMessage(data.error || "Unknown error occurred.");
      } else {
        setLoanData(data);
        setLoanStatus(data.loanStatus);  
        setLoanType(data.loanType);
      }
    } catch (err) {
      setMessage("Error loading loan");
    } finally {
      setLoading(false);
    }
  };

  fetchLoan();
}, [loanId]);



  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!loanData) return;
    const { name, value } = e.target;
    setLoanData({ ...loanData, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!loanData || !loanId) return;
    const updatedLoan = {
      ...loanData,
      loanStatus,
      loanType
    };
    const res = await updateLoan(Number(loanId), updatedLoan);
    // const res = await updateLoan(Number(loanId), loanData);

    try {
      const data = await res.json();
      if (data?.id) {
        Swal.fire({
          title: "Updated!",
          text: "Loan updated successfully!",
          icon: "success",
          toast: true,
          timer: 2000,
          showConfirmButton: false,
        });
        setTimeout(() => navigate("/home"), 2000);
      } else {
        setMessage(data["error: "] || "Error updating loan");
      }
    } catch (err) {
      setMessage("Server error");
    }
  };

  return (
    <div className="">
      <div className="shape"></div>
      <div className="shape"></div>
      {loading ? (
  <p>Loading loan data...</p>
) : message ? (
  <p style={{ color: 'red' }}>{message}</p>
) :(
        <form className="loan-form" onSubmit={handleSubmit}>
          <h3>Update Loan</h3>

          <label>Amount Requested</label>
          <input
            name="amountRequested"
            type="number"
            value={loanData?.amountRequested}
            onChange={handleChange}
            required
          />

          <label hidden>Last Update</label>
          <input hidden
            name="lastUpdate"
            type="text"
            value={loanData?.lastUpdate}
            onChange={handleChange}
            required
          />

          <label hidden>Manager Update</label>
          <input hidden
            name="managerUpdate"
            type="text"
            value={loanData?.managerUpdate}
            onChange={handleChange}
          />

          <label>Status Reason</label>
          <input
            name="statusReason"
            type="text"
            value={loanData?.statusReason}
            onChange={handleChange}
          />

          <label htmlFor="loanStatus">Loan Status</label>
          <select
            id="loanStatus"
            value={loanStatus?.id ?? ''}
            onChange={(e) => setLoanStatus({ id: parseInt(e.target.value, 10) })}
            required
          >
            <option value="">Select Status</option>
            <option value={1}>Approved</option>
            <option value={2}>Rejected</option>
          </select>

          <label htmlFor="loanType">Loan Type</label>
          <select
            id="loanType"
            value={loanType?.id ?? ''}
            onChange={(e) => setLoanType({ id: parseInt(e.target.value, 10) })}
            required
          >
            <option value="">Select Type</option>
            <option value={1}>Personal Loan</option>
            <option value={2}>Mortgage Loan</option>
            <option value={3}>Car Loan</option>
            <option value={4}>Student Loan</option>
          </select>


          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
}

export default UpdateLoan;
