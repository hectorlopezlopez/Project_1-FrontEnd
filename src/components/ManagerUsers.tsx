import React, { useEffect, useState } from "react";
import { getAllUsers } from "../services/manager";

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
        <div>
            <h2>Lista de Usuarios</h2>
            {error ? (
                <p style={{ color: "red" }}>{error}</p>
            ) : (
                <ul>
                    {users.map((user, index) => (
                        <li key={index}>
                            {user.firstName} {user.lastName}  -  {user.email}  -  {user.phone}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default getAllUsersManager;
