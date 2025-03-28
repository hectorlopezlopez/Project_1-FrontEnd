// src/router/AppRouter.tsx
import { JSX, useContext } from 'react';
// import { Navigate, Route, Routes } from 'react-router-dom';
// import Login from '../components/Login';
import Register from '../components/Register';
// import Home from '../pages/Home';
import CompleteProfile from '../components/CompleteProfile';
import CompleteAddress from '../components/CompleteAddress';
import { AuthContext } from '../context/AuthContext';
import { Navigate, Route, Routes } from 'react-router';
import Home from '../pages/Home';
import Login from '../components/Login';
import CreateLoan from '../components/CreateLoan';
import ManagerUsers from '../components/ManagerUsers';
import UpdateMyProfile from '../components/UpdateMyProfile';
import UpdateAddress from '../components/UpdateAddress';
import GetLoans from '../components/GetLoans';
import UpdateLoan from '../components/UpdateMyLoan';
import GetUserById from '../components/GetUserById';
import GetLoanById from '../components/GetLoanById';


export const AppRouter = (): JSX.Element => {
  const { authStatus, hasUserProfile } = useContext(AuthContext);

  console.log("Estado desde AppRouter:", authStatus, hasUserProfile);

  if (authStatus === 'checking') {
    return <p>Loading session 🔥...</p>;
  }

  return (
    <Routes>
      {authStatus === 'authenticated' ? (
        hasUserProfile ? (
          <>
            <Route path="/home" element={<Home />} />
            <Route path="/myprofile" element={<UpdateMyProfile />} />
            <Route path='/loan' element={<CreateLoan/>} />
            <Route path="/create-address" element={<CompleteAddress />} /> 
            <Route path="/myAddress" element={<UpdateAddress />} />
            {/* <Route path="/update-loan/:" element={<UpdateLoan/>} /> */}
            <Route path="/update-loan/:loanId" element={<UpdateLoan />} />
            <Route path="/user/:userId" element={<GetUserById />} />
            <Route path="/loanbyid/:loanId2" element={<GetLoanById />} />
            <Route path="/*" element={<Navigate to="/home" />} />
            <Route path="/users" element={<ManagerUsers />} /> 
            <Route path='/loans' element={<GetLoans/>} />         
            
            </>
        ) : (
          <>
            <Route path="/complete-profile" element={<CompleteProfile />} />
            <Route path="/*" element={<Navigate to="/complete-profile" />} />
          </>
        )
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};
