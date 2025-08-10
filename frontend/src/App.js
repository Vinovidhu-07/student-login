import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email,setEmail] = useState('');
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:5000/');
    const data = await res.json();
    setUsers(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editId) {
      
      await fetch(`http://localhost:5000/${editId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email}),
      });
    } else {
      await fetch('http://localhost:5000/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ firstname, lastname, email }),
      });
    }

    setFirstname('');
    setLastname('');
    setEmail('');
    setEditId(null);
    fetchUsers();
  };

  const handleEdit = (user) => {
    setFirstname(user.firstname);
    setLastname(user.lastname);
    setEmail(user.email);
    setEditId(user._id);
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5000/${id}`, {
      method: 'DELETE',
    });
    fetchUsers();
  };

  return (
    <div className="App">
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstname}
          placeholder="First Name"
          onChange={(e) => setFirstname(e.target.value)}
          required
        /><br/>

        <input
          type="text"
          value={lastname}
          placeholder="Last Name"
          onChange={(e) => setLastname(e.target.value)}
          required
        /><br/>

        <input
          type="email"
          value={email}
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br/>
        <button type="submit">{editId ? 'Update' : 'Add'} User</button>
      </form>

      <h3>User List</h3>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.firstname} {user.lastname} {user.email}
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
