import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  const handleNewUser = (e) => {
    e.preventDefault();
    const newUser = { id: crypto.randomUUID(), name, email, phone };
    setUsers([...users, newUser]);
    setName("");
    setEmail("");
    setPhone("");
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleSearchOrReset = () => {
    if (filteredUsers.length > 0) {
      setFilteredUsers([]);
      setSearchInput("");
    } else {
      const newFilteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      setFilteredUsers(newFilteredUsers);
      setSearchInput("");
    }
  };

  return (
    <div className="app-container">
      <h1 className="main-title">Contact List</h1>

      <div className="content-wrapper">
        <div className="form-section">
          <h2>Add Contact</h2>
          <form onSubmit={handleNewUser} className="contact-form">
            <input
              placeholder="Name"
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
            />
            <input
              placeholder="Email"
              required
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
            />
            <input
              placeholder="Phone Number"
              required
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="input-field"
            />
            <button type="submit" className="add-button">
              Add Contact
            </button>
          </form>
        </div>

        <div className="contacts-section">
          <h2>Contacts</h2>
          <div className="search-bar">
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name..."
              className="search-input"
            />
            <button onClick={handleSearchOrReset} className="search-button">
              {filteredUsers.length > 0 ? "Reset" : "Search"}
            </button>
          </div>

          <div className="contacts-list">
            {(filteredUsers.length > 0 ? filteredUsers : users).map((user) => (
              <div key={user.id} className="contact-card">
                <div>
                  <h3>{user.name}</h3>
                  <p>{user.email}</p>
                  <p>{user.phone}</p>
                </div>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="delete-button"
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
