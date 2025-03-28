import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getLoanById } from '../services/loan';
import { Loan } from '../models/Loan';
import './CompleteProfile.css';

const GetLoanById = () => {
  const { loanId2 } = useParams<{ loanId2: string }>();
  const [loan, setLoan] = useState<Loan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (loanId2) {
      setLoading(true);
      setError(null);
      getLoanById(Number(loanId2))
        .then((response) => {
          if (!response.ok) throw new Error("Loan not found");
          return response.json();
        })
        .then((data) => {
          setLoan(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching loan:", err);
          setError("Loan not found. Redirecting to home...");
          setLoading(false);
          setTimeout(() => navigate("/home"), 2500);
        });
    }
  }, [loanId2, navigate]);

  if (loading) return <p className="loading">Loading loan...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!loan) return <p className="error">No loan found.</p>;

  return (
    <div className="loan-details-container">
      <h1>Loan Details</h1>
      <p><strong>Amount:</strong> {loan.amountRequested}</p>
      <p><strong>Status Reason:</strong> {loan.statusReason || "N/A"}</p>
      <p><strong>Manager Update:</strong> {loan.managerUpdate || "N/A"}</p>
      <p><strong>Last Update:</strong> {loan.lastUpdate}</p>
      <p><strong>Status:</strong> {loan.loanStatus?.loanStatus || "N/A"}</p>
      {/* <p><strong>Type:</strong> {loan.loanType?.loanType || "N/A"}</p> */}

      <button className="return-btn" onClick={() => navigate("/home")}>
        Return
      </button>
    </div>
  );
};

export default GetLoanById;
