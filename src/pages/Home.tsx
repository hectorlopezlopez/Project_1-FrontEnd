// src/pages/Home.tsx
import { JSX, useContext, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import { logoutRequest } from '../services/authservice';

function Home(): JSX.Element {
  const { user, role, address, logout } = useContext(AuthContext);
  const [userId, setUserId] = useState('');
  const [loanId, setLoanId] = useState('');
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

  const handleUpdateMyProfile = async (): Promise<void> => {
    navigate("/myprofile");
  }

  const handleUpdateMyAddress = async (): Promise<void> => {
    navigate("/myAddress");
  }

  const handleSetMyAddress = async (): Promise<void> => {
    navigate("/create-address");
  }

  const handleCreateNewLoan = async (): Promise<void> => {
    navigate("/loan");
  }

  const handleViewAllUsers = async (): Promise<void> => {
    navigate("/users");
  }

  const handleViewAllLoans = async (): Promise<void> => {
    navigate("/loans");
  }

  // const handleViewUserById = async (): Promise<void> => {
  //   navigate("/*");
  // }

  const handleViewLoanById = async (): Promise<void> => {
    // navigate("/*");
  }
  const handleUserIdInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserId(event.target.value);
  };

  const handleSearch = () => {
    if (userId) {
      // Redirect to the GetUserById page with the userId
      navigate(`/user/${userId}`);
    }
  };

  console.log("USER desde Home:", user);
  console.log("ROLE desde Home:", role?.roleId);
  console.log("ADDRESS desde Home: ", address);

/*
  if (!user || !role) {
    return <p style={{ textAlign: 'center' }}>loading user...</p>;
  }
*/

  return (
    <div>
      <div className = "font-monospace"
         style = {{position: "absolute", top: "21%", left: "21%",
                   fontSize: "20px", color: "rgba(0, 0, 0, 1)"}}>
        <p className = "fs-5"><b>P R O F I L E</b></p></div>

      <ol style = {{position: "absolute", top: "30%", left: "5%",
                    listStyle: "none", textAlign: "center"}}
          className = "list-group list-group-flush">
        <li className = "list-group-item d-flex justify-content-between">
            <div className = "fst-italic">
              <b>Role:</b></div>
            <div className = "fw-light">
              <p className = "fst-italic">{user?.account?.role?.roleName}</p>
          </div>
        </li>
        <li className = "list-group-item d-flex justify-content-between">
            <div className = "fst-italic">
              <b>First name:</b></div>
            <div className = "fw-light">
              <p className = "fst-italic">{user?.firstName}</p>
          </div>
        </li>
        <li className = "list-group-item d-flex justify-content-between">
            <div className = "fst-italic">
              <b>Last name:</b></div>
            <div className = "fw-light">
              <p className = "fst-italic">{user?.lastName}</p>
          </div>
        </li>
        <li className = "list-group-item d-flex justify-content-between">
            <div className = "fst-italic">
              <b>Phone number:</b></div>
            <div className = "fw-light">
              <p className = "fst-italic">{user?.phone}</p>
              </div>
        </li>
        <li className = "list-group-item d-flex justify-content-between">
            <div className = "fst-italic">
              <b>Email:</b></div>
            <div className = "fw-light">
              <p className = "fst-italic"><pre>     {user?.email}</pre></p>
          </div>
        </li>
        <li className = "list-group-item d-flex justify-content-between">
            <div className = "fst-italic">
              <b>Affiliation date:</b></div>
            <div className = "fw-light">
              <p className = "fst-italic">{user?.createdAt}</p>
          </div>
        </li>
      </ol>

      <ol style = {{position: "absolute", top: "30%", left: "30%",
                    listStyle: "none", textAlign: "center"}}
          className = "list-group list-group-flush">
        <li className = "list-group-item d-flex justify-content-between">
            <div className = "fst-italic">
              <b>Country:</b></div>
            <div className = "fw-light">
              <p className = "fst-italic">{address?.country}</p>
          </div>
        </li>
        <li className = "list-group-item d-flex justify-content-between">
            <div className = "fst-italic">
              <b>State:</b></div>
            <div className = "fw-light">
              <p className = "fst-italic">{address?.state}</p>
          </div>
        </li>
        <li className = "list-group-item d-flex justify-content-between">
            <div className = "fst-italic">
              <b>City:</b></div>
            <div className = "fw-light">
              <p className = "fst-italic">{address?.city}</p>
              </div>
        </li>
        <li className = "list-group-item d-flex justify-content-between">
            <div className = "fst-italic">
              <b>Street:</b></div>
            <div className = "fw-light">
              <p className = "fst-italic">{address?.street}</p>
          </div>
        </li>
        <li className = "list-group-item d-flex justify-content-between">
            <div className = "fst-italic">
              <b>Street number:</b></div>
            <div className = "fw-light">
              <p className = "fst-italic">{address?.street}</p>
          </div>
        </li>
        <li className = "list-group-item d-flex justify-content-between">
            <div className = "fst-italic">
              <b>Zip:</b></div>
            <div className = "fw-light">
              <p className = "fst-italic">{address?.zip}</p>
          </div>
        </li>
      </ol>

      {role?.roleId === 2 && (
        <div>
          <button type = "button" className = "btn btn-secondary"
            onClick = {handleViewAllUsers}
            style = {{position: "absolute", bottom: "320px", right: "0px",
            margin: "30px", padding: "10px 30px"}}><b>View users</b>
          </button>
          <button type = "button" className = "btn btn-secondary"
            onClick = {handleViewAllLoans}
            style = {{position: "absolute", bottom: "240px", right: "0px",
            margin: "30px", padding: "10px 30px"}}><b>View loans</b>
          </button>
          <button type = "button" className = "btn btn-info"
            onClick = {handleSearch}
            style = {{position: "absolute", bottom: "160px", right: "0px",
            margin: "30px", padding: "10px 30px"}}><b>View user</b>
          </button>

          <div className = "form-floating mb-3"
               style = {{position: "absolute", bottom: "140px", right: "220px"}}>
            <input style = {{textAlign: "center"}}
                   type = "number" placeholder = "User ID" value = {userId} onChange={handleUserIdInputChange}/>
          </div>
          <button type = "button" className = "btn btn-info"
            onClick = {handleViewLoanById}
            style = {{position: "absolute", bottom: "80px", right: "0px",
            margin: "30px", padding: "10px 30px"}}><b>View loan</b>
          </button>
          <div className = "form-floating mb-3"
               style = {{position: "absolute", bottom: "60px", right: "220px"}}>
                {/* ---------------------------------------------------------------------------------- */}
            {/* <input style = {{textAlign: "center"}}
                   type = "text" placeholder = "Loan ID" value = {"null"} onChange={e => setLoanId(e.target.value)}/> */}
                   <input
  style={{ textAlign: "center" }}
  type="text"
  placeholder="Loan ID"
  value={loanId} // <- aquí ya usas el estado dinámico
  onChange={(e) => setLoanId(e.target.value)}
/>

  {/* ---------------------------------------------------------------------------------- */}
          </div>
          {/* <button type = "button" className = "btn btn-info"
            onClick = {handleCreateNewLoan}
            style = {{position: "absolute", bottom: "0px", right: "0px",
              margin: "30px", padding: "10px 20px"}}><b>Update loan</b>
          </button> */}

          <button
  type="button"
  className="btn btn-info"
  onClick={() => navigate(`/update-loan/${loanId}`)}
  style={{ position: "absolute", bottom: "0px", right: "0px", margin: "30px", padding: "10px 20px" }}
>
  <b>Update loan</b>
</button>
  {/* ---------------------------------------------------------------------------------- */}


        </div>
      )}

      {role?.roleId === 1 && (
        <div>
          <div className = "font-monospace"
               style = {{position: "absolute", top: "21%", right: "13.5%",
               fontSize: "20px", color: "rgba(0, 0, 0, 1)"}}>
            <p className = "fs-5"><b>A P P L I C A T I O N S</b></p>
          </div>
          <div className="card text-bg-light mb-3" style = {{width: "30rem",
               position: "absolute", top: "30%", right: "5%", fontSize: "20px",
               color: "rgba(0, 0, 0, 1)"}}>
            <div className = "card-body">
              <p className = "fs-6">No loan applications has been fulfilled</p>
            </div>
          </div>
          <button type = "button" className = "btn btn-dark"
            onClick = {handleCreateNewLoan}
            style = {{position: "absolute", top: "0px", left: "15.5%",
            margin: "30px", padding: "10px 20px"}}><b>Apply</b>
          </button>
        </div>
      )}

      <button  type = "button" className = "btn btn-dark"
        onClick = {handleLogout}
        style = {{position: "absolute", top: "0px", right: "0px", margin: "30px",
        padding: "10px 20px"}}><b>Log out</b></button>
      <button type = "button" className = "btn btn-light"
        onClick = {handleUpdateMyProfile}
        style = {{position: "absolute", bottom: "0px", left: "8%",
        margin: "30px", padding: "10px 20px"}}><b>Edit profile</b></button>
      <button type = "button" className = "btn btn-light"
        onClick = {handleUpdateMyAddress}
        style = {{position: "absolute", bottom: "0px", left: "31.5%",
        margin: "30px", padding: "10px 20px"}}><b>Edit mailing address</b></button>
      <button type = "button" className = "btn btn-secondary"
        onClick = {handleSetMyAddress}
        style = {{position: "absolute", top: "0px", left: "0px",
        margin: "30px", padding: "10px 20px"}}><b>Set mailing address</b></button>
    </div>
  );
}

export default Home;