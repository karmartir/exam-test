import { useState } from 'react';
import './App.css';

function App() {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleNewUser = (e) => {
    e.preventDefault();
    const newUser = { id: crypto.randomUUID(), ...form };
    setUsers([...users, newUser]);
    setForm({ name: '', email: '', phone: '' });
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSearchOrReset = () => {
    if (filteredUsers.length > 0) {
      // Reset
      setFilteredUsers([]);
      setSearchInput('');
    } else {
      // Search
      const results = users.filter((user) =>
        user.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredUsers(results);
      setSearchInput('');
    }
  };

  return (
    <div className="App">
      <h1 className="title">Contact List</h1>
      <div className="container">
        <div className="form-section">
          <h2>Add Contact</h2>
          <form onSubmit={handleNewUser} className="contact-form">
            <input
              name="name"
              placeholder="Name"
              required
              value={form.name}
              onChange={handleChange}
            />
            <input
              name="email"
              placeholder="Email"
              required
              value={form.email}
              onChange={handleChange}
            />
            <input
              name="phone"
              placeholder="Phone Number"
              required
              value={form.phone}
              onChange={handleChange}
            />
            <button type="submit">Add Contact</button>
          </form>
        </div>

        <div className="list-section">
          <h2>Contacts</h2>
          <div className="search-bar">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name"
            />
            <button onClick={handleSearchOrReset}>
              {filteredUsers.length > 0 ? 'Reset' : 'Search'}
            </button>
          </div>

          <div className="contact-list">
            {(filteredUsers.length > 0 ? filteredUsers : users).map((user) => (
              <div className="contact-card" key={user.id}>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
