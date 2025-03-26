import React, { useEffect, useState } from "react";
import {getAllLoans} from "../services/loan";
import { Loan } from "../models/Loan";

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
            <div>
      <h2>List of Loans</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {loans.map((loan) => (
            <li key={loan.loanId}>
              ID: {loan.loanId} 
              - Monto: {loan.amountRequested} 
              - Manager Update: {loan.managerUpdate} 
              {/* - User: {loan.user}
              - Estado: {loan.loanStatus}
              - Type: {loan.loanType} */}
              - Last update: {loan.lastUpdate}
              - Status: {loan.statusReason}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
        
    
};
export default getAllLoansComp;