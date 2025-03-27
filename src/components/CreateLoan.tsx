import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";
import './Loans.css';

function CreateLoan() {
    const [amountRequested, setAmountRequested] = useState('');
    const [lastUpdate, setLastUpdate] = useState('');
    const [loanTypeId, setLoanTypeId] = useState<number | undefined>();
    const [loanStatusId, setLoanStatusId] = useState<number | undefined>(); 
    const navigate = useNavigate();

    const handleCreateLoan = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            amountRequested: parseInt(amountRequested, 10), 
            lastUpdate, 
            loanStatus: {
                id: loanStatusId, 
            },
            loanType: {
                id: loanTypeId, 
            },
        };

        console.log("Payload being sent:", payload);

        try {
            const res = await fetch("http://localhost:8080/loan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log("Loan created successfully:", data);
            navigate("/success"); // Adjust the route as needed
        } catch (error) {
            console.error("Error creating loan:", error);
        }
    };

    return (
      <div className="background">
      <div className="shape"></div>
      <div className="shape"></div>
    
      <form className="loan-form" onSubmit={handleCreateLoan}>
        <h3>Create Loan</h3>
    
        <label htmlFor="amountRequested">Amount Requested</label>
        <input
          id="amountRequested"
          type="number"
          placeholder="Amount Requested"
          value={amountRequested}
          onChange={(e) => setAmountRequested(e.target.value)}
          required
        />
    
        <label htmlFor="lastUpdate">Created (YYYY-MM-DD)</label>
        <input
          id="lastUpdate"
          type="text"
          placeholder="Created: (YYYY-MM-DD)"
          value={lastUpdate}
          onChange={(e) => setLastUpdate(e.target.value)}
          required
        />
    
        <label htmlFor="loanTypeId">Loan Type ID</label>
        <input
          id="loanTypeId"
          type="number"
          placeholder="Loan Type ID"
          value={loanTypeId ?? ''}
          onChange={(e) => setLoanTypeId(parseInt(e.target.value, 10))}
          required
        />
    
        <label htmlFor="loanStatusId">Loan Status ID</label>
        <input
          id="loanStatusId"
          type="number"
          placeholder="Loan Status ID"
          value={loanStatusId ?? ''}
          onChange={(e) => setLoanStatusId(parseInt(e.target.value, 10))}
          required
        />
    
        <button type="submit">Create Loan</button>
      </form>
    </div>
    
    );
}

export default CreateLoan;