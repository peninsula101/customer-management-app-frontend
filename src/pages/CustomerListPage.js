import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import "../styles/CustomerList.css";


export default function CustomerListPage() {
  const [customers, setCustomers] = useState([]);
  const [q, setQ] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pin, setPin] = useState("");
  const [page, setPage] = useState(1);

  async function load() {
    const { data } = await api.get("/customers", {
      params: { q, city, state, pin, page, limit: 5 },
    });
    setCustomers(data.data || []);
  }

  useEffect(() => {
    load();
  }, [q, city, state, pin, page]);

  return (
    <div style={{ padding: "20px" }} className="customer-list">
      <h1>Customers</h1>

      <div style={{ marginBottom: "10px" }}>
        <input
          placeholder="Search name"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <input
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
        <input
          placeholder="PIN"
          value={pin}
          onChange={(e) => setPin(e.target.value)}
        />
        <button onClick={() => { setQ(""); setCity(""); setState(""); setPin(""); }}>
          Clear Filters
        </button>
      </div>

      <Link to="/customers/new">➕ Add Customer</Link>

      <table border="1" cellPadding="6" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>
                <Link to={`/customers/${c.id}`}>
                  {c.first_name} {c.last_name}
                </Link>
              </td>
              <td>{c.phone_number}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "10px" }}>
        <button disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </button>
        <span style={{ margin: "0 10px" }}>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
