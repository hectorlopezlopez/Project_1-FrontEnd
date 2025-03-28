import React, { useEffect, useState } from "react";
import {getAllLoans} from "../services/loan";
import { Loan } from "../models/Loan";
import "./AllLoans.css";
import { useNavigate } from "react-router";
const getAllLoansComp: React.FC = () =>{
    const [loans, setLoans] = useState<Loan[]>([]);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
            const fetchLoans = async () => {
                try {
                    const loanList = await getAllLoans();
                    if (loanList) {
                        setLoans(loanList);
                    }
                } catch (err) {
                    setError("Not allow.");
                }
            };
            fetchLoans();
        }, []);

        return(
          <div className="loan-list-container">
          <h2>Lista de Préstamos</h2>
        
          {error ? (
            <p className="error">{error}</p>
          ) : (
            <>
              <div className="loan-list-header">
                <span>ID</span>
                <span>Monto</span>
                <span>Manager</span>
                <span>Actualización</span>
                <span>Estado</span>
              </div>
              <ul className="loan-list">
                {loans.map((loan) => (
                  <li key={loan.id} className="loan-list-item">
                    <span>{loan.id}</span>
                    <span>{loan.amountRequested}</span>
                    <span>{loan.managerUpdate}</span>
                    <span>{loan.lastUpdate}</span>
                    <span>{loan.statusReason}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
          <button className="return-btn" onClick={() => navigate("/home")}>
        Return
      </button>
        </div>

        
  );
        
    
};
export default getAllLoansComp;