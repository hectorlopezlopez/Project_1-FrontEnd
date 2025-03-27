import React, { useEffect, useState } from "react";
import {getAllLoans} from "../services/loan";
import { Loan } from "../models/Loan";
import "./AllLoans.css";
const getAllLoansComp: React.FC = () =>{
    const [loans, setLoans] = useState<Loan[]>([]);
    const [error, setError] = useState<string | null>(null);

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
                  <li key={loan.loanId} className="loan-list-item">
                    <span>{loan.loanId}</span>
                    <span>{loan.amountRequested}</span>
                    <span>{loan.managerUpdate}</span>
                    <span>{loan.lastUpdate}</span>
                    <span>{loan.statusReason}</span>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        
  );
        
    
};
export default getAllLoansComp;