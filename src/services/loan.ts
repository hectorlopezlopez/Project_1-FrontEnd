import { Loan } from "../models/Loan";
import { LoanStatus } from "../models/LoanStatus";
import { LoanType } from "../models/LoanType";

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
};

export const updateUserLoan = async (loanData: Loan): Promise<Response> =>{
return await fetch(`${API_BASE_URL}/loan/userLoan`,{
  method: "PUT",
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  body: JSON.stringify(loanData)
})
}

export const updateLoan = async (id: number, data:{
  managerUpdate?: string;
  loanStatus?: LoanStatus;
  loanType?: LoanType;
  statusReason?: string;
}) =>{
  return await fetch(`${API_BASE_URL}/loan/${id}`,{
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    credentials: 'include',
    body: JSON.stringify(data),
  });
};

