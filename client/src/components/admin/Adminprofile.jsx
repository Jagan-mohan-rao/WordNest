import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { UACobj } from '../../contexts/UserAuthorContext2';
import '../allCSS/home.css'

function Adminprofile() {
  const [users, setUsers] = useState([]); // Hook 1
  const [error, setError] = useState(''); // Hook 2
  const {currentUser}=useContext(UACobj) // Hook 3

  // Fetch all users/authors
  useEffect(() => { // Hook 4 (must be called unconditionally)
    // Only make the API call if the user is an admin
    if (currentUser && currentUser.role === 'admin') {
      axios.get('${import.meta.env.VITE_API_BASE_URL}/admin-api/all-users')
        .then(res => setUsers(res.data.payload))
        .catch(() => setError('Failed to fetch users'));
    }
  }, [currentUser]); // Add currentUser to dependency array

  // Move the authorization check AFTER all hooks
  if (!currentUser || currentUser.role !== 'admin') {
    return <div className="container mt-5"><h2 className="text-danger">Unauthorized</h2></div>;
  }

  // Toggle active status
  const toggleActive = async (id, isActive) => {
    try {
      const res = await axios.put(`${import.meta.env.VITE_API_BASE_URL}/admin-api/toggle-active/${id}`, { isActive: !isActive });
      setUsers(users.map(u => u._id === id ? { ...u, isActive: !isActive } : u));
    } catch {
      setError('Failed to update status');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className='text-info fw-semibold text-decoration-underline'>Admin Profile</h2>
      {error && <p className="text-danger">{error}</p>}
      <table className="glass-box fs-5  text-light table-borderless  mt-4">
        <thead className=''>
          <tr className=''>
            <th className=''>Name</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id} className='user-row-spacing'>
              <td>{u.firstName} {u.lastName}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>{u.isActive ? 'Active' : 'Blocked'}</td>
              <td>
                <button
                  className={`btn btn-${u.isActive ? 'danger' : 'success'} btn-sm`}
                  onClick={() => toggleActive(u._id, u.isActive)}
                >
                  {u.isActive ? 'Block' : 'Unblock'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default Adminprofile;