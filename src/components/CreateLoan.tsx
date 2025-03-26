import { useState, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';

function CreateLoan() {
    const [amountRequested, setAmountRequested] = useState('');
    const [lastUpdate, setLastUpdate] = useState('');
    const [loanTypeId, setLoanTypeId] = useState<number>();
    const [userId, setUserId] = useState<number>();
    const navigate = useNavigate();

    const handleCreateLoan = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        console.log({ amountRequested,lastUpdate, loanTypeId, userId });
        try {
            const res = await fetch("http://localhost:8080/loan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ amountRequested, lastUpdate, loanTypeId, userId }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }
            
            const data = await res.json();
            console.log("Loan created successfully:", data);
            // Optionally navigate to another page after success
            // navigate("/success"); // Adjust the route as needed
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
                    placeholder="Last Update"
                    value={lastUpdate}
                    onChange={(e) => setLastUpdate(e.target.value)}
                /><br/>

                <input
                    type="number"
                    placeholder="Loan Type Id"
                    value={loanTypeId}
                    onChange={(e) => setLoanTypeId(parseInt(e.target.value, 10))}
                /><br/>
                <input
                    type="number"
                    placeholder="User Id"
                    value={userId}
                    onChange={(e) => setUserId(parseInt(e.target.value, 10))}
                /><br/>
                <button type="submit">Create Loan</button>
            </form>
        </div>
    );
}

export default CreateLoan;