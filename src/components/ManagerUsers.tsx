import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/manager";
import "./User.css";
const getAllUsersManager: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const userList = await getAllUsers();
                if (userList) {
                    setUsers(userList);
                }
            } catch (err) {
                setError("No tienes permiso para ver la lista de usuarios.");
            }
        };
        fetchUsers();
    }, []);

    return (
        <div className="user-list-container">
  <h2>Lista de Usuarios</h2>
  {error ? (
    <p className="error">{error}</p>
  ) : (
    <>
      <div className="user-list-header">
        <span>Nombre</span>
        <span>Email</span>
        <span>Teléfono</span>
      </div>
      <ul className="user-list">
        {users.map((user, index) => (
          <li key={index} className="user-list-item">
            <span>{user.firstName} {user.lastName}</span>
            <span>{user.email}</span>
            <span>{user.phone}</span>
          </li>
        ))}
      </ul>
    </>
  )}
</div>

      
      
    );
};

export default getAllUsersManager;
