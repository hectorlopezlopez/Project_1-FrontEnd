import { useState, FormEvent } from "react";
import { useNavigate } from "react-router";

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
        <div>
            <h2>Create Loan</h2>
            <form onSubmit={handleCreateLoan}>
                <input
                    type="number"
                    placeholder="Amount Requested"
                    value={amountRequested}
                    onChange={(e) => setAmountRequested(e.target.value)}
                /><br/>

                <input
                    type="text"
                    placeholder="Created: (YYYY-MM-DD)"
                    value={lastUpdate}
                    onChange={(e) => setLastUpdate(e.target.value)}
                /><br/>

                <input
                    type="number"
                    placeholder="Loan Type ID"
                    value={loanTypeId ?? ''} // Handle undefined state
                    onChange={(e) => setLoanTypeId(parseInt(e.target.value, 10))}
                /><br/>

                <input
                    type="number"
                    placeholder="Loan Status ID"
                    value={loanStatusId ?? ''} // Handle undefined state
                    onChange={(e) => setLoanStatusId(parseInt(e.target.value, 10))}
                /><br/>

                <button type="submit">Create Loan</button>
            </form>
        </div>
    );
}

export default CreateLoan;