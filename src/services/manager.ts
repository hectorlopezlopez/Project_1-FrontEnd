const API_BASE = 'http://localhost:8080';


export const getAllUsers = async () => {
    return await fetch(`${API_BASE}/users`, {
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
