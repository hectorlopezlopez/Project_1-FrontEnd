import { Loan } from "../models/Loan";

const API_BASE_URL = 'http://localhost:8080';

export const createLoan = async (loan: any) =>{
  fetch(`${API_BASE_URL}/loan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loan)
  });
}


export const getAllLoans = async () => {
  return await fetch(`${API_BASE_URL}/loan`, {
    method: 'GET',
    credentials: 'include',
    headers: {
     'Content-Type': 'application/json'
      }
      }).then(async (response) => {
        const data = await response.json();
        if (typeof data === "string" && data.startsWith("error")) {
            throw new Error(data);
        }
        return data;
    }).catch(error => {
        console.error("Error fetching users:", error);
        return null;
    });
}

export const updateLoan = async (loanId: number, loanData : Loan): Promise<Response> =>{
  return await fetch("http://localhost:8080/loan/${loanId}",{
    method :"PUT",
    headers: {
      "Content-type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(loanData),
  });
};

