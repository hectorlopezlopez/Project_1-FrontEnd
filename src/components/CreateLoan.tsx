import { useState, FormEvent } from "react";
import { useNavigate } from 'react-router-dom';

function CreateLoan() {
    const [amountRequested, setAmountRequested] = useState<string>('');
    const [loanTypeId, setLoanTypeId] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const navigate = useNavigate();

    const handleCreateLoan = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await fetch("http://localhost:8080/loan", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ amountRequested, loanTypeId, userId }),
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res.status}`);
            }

            const data = await res.json();
            console.log("Loan created successfully:", data);
            // Optionally navigate to another page after success
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
                    type="text"
                    placeholder="Amount Requested"
                    value={amountRequested}
                    onChange={(e) => setAmountRequested(e.target.value)}
                /><br/>
                <input
                    type="text"
                    placeholder="Loan Type Id"
                    value={loanTypeId}
                    onChange={(e) => setLoanTypeId(e.target.value)}
                /><br/>
                <input
                    type="text"
                    placeholder="User Id"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                /><br/>
                <button type="submit">Create Loan</button>
            </form>
        </div>
    );
}

export default CreateLoan;