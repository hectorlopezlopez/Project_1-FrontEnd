import { Loan } from "../models/Loan";

const API_BASE_URL = 'http://localhost:8080';

export const createLoan = async (loan: any) =>
  fetch(`${API_BASE_URL}/loan`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(loan)
  });

export const getLoans = async () =>
    fetch(`${API_BASE_URL}/loan`, {
      credentials: 'include'
    });

export const getLoansUser = async() =>{
    return await fetch("${API_BASE_URL}/loan/user",{
        method: "GET",
        credentials: 'include',
    });
};


  