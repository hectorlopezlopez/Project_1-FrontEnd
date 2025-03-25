import {User} from "./User";
import {LoanStatus} from "./LoanStatus";
import {LoanType} from "./LoanType"; 

export interface Loan {
    loanId?: number;
    amountRequested: number;
    managerUpdate: string;
    user?: User;
    loanStatus?: LoanStatus;
    loanType?: LoanType;
    lastUpdate: string;
    statusReason: string;
}