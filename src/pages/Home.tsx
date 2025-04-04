// src/pages/Home.tsx
import { JSX, useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { logoutRequest } from '../services/authservice';

function Home(): JSX.Element {
  const { user, role, address, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (): Promise<void> => {
    // await fetch("http://localhost:8080/auth/accounts/logout", {
    //   method: "GET",
    //   credentials: "include",
    // });
    logoutRequest();
    logout();
    navigate("/login");
  };

  // const handleAllUsers = async (): Promise<void> => {
  //   navigate("/users")
  // }

  const handleAddress = async (): Promise<void> => {
    navigate("/create-address");
  }

  console.log("USER desde Home:", user);
  console.log("ROLE desde Home:", role?.roleId);
  console.log("ADDRESS desde Home: ", address);

  if (!user || !role) {
    return <p style={{ textAlign: 'center' }}>loading user...</p>;
  }

  return (
    <div>
      <h1>Hola 🥵, {user?.firstName}</h1>
      <p>Tu rol es: {user?.account?.role?.roleName}</p>

      {role.roleId === 2 && (
        <div>
          <p>Esta sección solo la ven los MANAGERS</p>
          <button type="button" onClick={() => navigate("/users")}>All Users</button>
          <button type="button" onClick={() => navigate("/loans")}>All Loans</button>

        </div>
      )}

      {role.roleId === 1 && (
        <div>
          <p>Esta sección solo la ven los USUARIOS NORMALES</p>
          <button onClick={handleAddress}>Address</button>
        </div>
      )}

      <button onClick={handleLogout}>Log out</button>
      <button type="button" onClick={() => navigate("/myprofile")}>Updatemyprof</button>
      <button type="button" onClick={() => navigate("/loan")}>Loan</button>
      <button type="button" onClick={() => navigate("/myAddress")}>myAddress</button>
    </div>
  );
}

export default Home;
