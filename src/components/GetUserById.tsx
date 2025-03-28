import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserById } from '../services/user';
import { User } from '../models/User';
import './GetUserById.css'; // Import the new CSS for styling

const GetUserById = () => {
  const { userId } = useParams<{ userId: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // To store error messages
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      setLoading(true);
      setError(null); // Reset the error state each time the request is made
      getUserById(Number(userId))
        .then((response) => {
          if (!response.ok) {
            throw new Error('User not found');
          }
          return response.json();
        })
        .then((data) => {
          setUser(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
          setError('User not found. Redirecting to home...');
          setLoading(false);
          setTimeout(() => navigate('/home'), 2500); // Redirect after 3 seconds
        });
    }
  }, [userId, navigate]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
      </div>
    );
  }

  if (!user) {
    return <div className="error">User not found.</div>;
  }

  return (
    <div className="user-details-container">
      <h1>User Details</h1>
      <div className="user-info">
        <h2>{user.firstName} {user.lastName}</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Account Created At:</strong> {user.createdAt}</p>
      </div>

      {user.address && (
        <div className="address-info">
          <h3>Address</h3>
          <p><strong>Country:</strong> {user.address.country}</p>
          <p><strong>State:</strong> {user.address.state}</p>
          <p><strong>City:</strong> {user.address.city}</p>
          <p><strong>Street:</strong> {user.address.street}</p>
          <p><strong>Street Number:</strong> {user.address.streetNum}</p>
          <p><strong>Postal Code:</strong> {user.address.zip}</p>
        </div>
      )}

      <button
        type="button"
        onClick={(e) => { e.preventDefault(); navigate("/home"); }}
        className="return-btn"
      >
        Return
      </button>
    </div>
  );
};

export default GetUserById;