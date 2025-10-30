import { useState } from "react";

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
    <>
      <h1>Contact List</h1>  
          <h2>Add Contact</h2>
          <form onSubmit={handleNewUser}>
            <input
              placeholder="Name"
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              placeholder="Email"
              required
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Phone Number"
              required
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button type="submit">Add Contact</button>
          </form>
   

        <div>
          <h2>Contacts</h2>
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search by name..."
            />
            <button onClick={handleSearchOrReset}>
              {filteredUsers.length > 0 ? "Reset" : "Search"}
            </button>
         

          <div>
            {(filteredUsers.length > 0 ? filteredUsers : users).map((user) => (
              <div key={user.id}>
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                <p>{user.phone}</p>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
     
    </>
  );
}
export default App;
