import "./App.css";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import initialContacts from "./initialContacts";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [contactList, setContactList] = useState(initialContacts);
  const [searchInput, setSearchInput] = useState("");
  const [filteredContactList, setFilteredContactList] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() && email.trim() && phone.trim()) {
      const newUser = { id: crypto.randomUUID(), name, email, phone };
      setContactList([...contactList, newUser]);
      toast.success("Contact added successfully");
    } else {
      toast.error("All fields are required");
    }
    setName("");
    setEmail("");
    setPhone("");
  };

  const handleDelete = (id) => {
    setContactList(contactList.filter((each) => each.id !== id));
    toast.info("Contact deleted successfully");
  };

  const handleSearch = () => {
    if (filteredContactList.length > 0) {
      // button has double click functionality - to clear the list(show all contacts) and search input
      setFilteredContactList([]);
      setSearchInput("");
    } else {
      const results = contactList.filter((user) =>
        user.name.toLowerCase().includes(searchInput.toLowerCase())
      );
      if (results.length === 0) {
        toast.error("No results found");
      } else {
        setFilteredContactList(results);
      }
      setSearchInput("");
    }
  };

  const displayList =
    filteredContactList.length > 0 ? filteredContactList : contactList;

  return (
    <div className="app-container">
      <ToastContainer position="top-right" autoClose={2000} />

      <div className="form-container">
        <h2>Add Contact</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <label>Name*</label>
          <input
            type="text"
            placeholder="New name..."
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Email*</label>
          <input
            type="email"
            placeholder="email..."
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Phone</label>
          <input
            type="text"
            placeholder="phone..."
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button className="btn add-btn" type="submit">
            Add Contact
          </button>
        </form>
      </div>

      <div className="contacts-section">
        <h2>Total Contacts: {contactList.length}</h2>

        <div className="search-container">
          <input
            placeholder="Search by name..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="search-input"
          />
          <button onClick={handleSearch} className="btn search-btn">
            {filteredContactList.length > 0 ? "Show All" : "Search"}
          </button>
        </div>

        <div className="contacts-grid">
          {displayList.map((user) => (
            <div key={user.id} className="contact-card">
              <button
                className="delete-btn-x"
                onClick={() => handleDelete(user.id)}
              >
                ❌
              </button>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
              <p>{user.phone}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
