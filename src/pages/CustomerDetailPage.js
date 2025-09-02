import { useParams, Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { api } from "../api";
import "../styles/CustomerDetail.css";


export default function CustomerDetailPage() {
  const { id } = useParams();
  const [customer, setCustomer] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [addr, setAddr] = useState({
    address_details: "",
    city: "",
    state: "",
    pin_code: "",
  });

  const load = useCallback(async () => {
    const c = await api.get(`/customers/${id}`);
    const a = await api.get(`/customers/${id}/addresses`);
    setCustomer(c.data.data);
    setAddresses(a.data.data || []);
  }, [id]);

  useEffect(() => {
    load();
  }, [load]);

  async function addAddress() {
    if (!addr.address_details || !addr.city || !addr.state || !addr.pin_code) {
      alert("All fields required");
      return;
    }
    await api.post(`/customers/${id}/addresses`, addr);
    setAddr({ address_details: "", city: "", state: "", pin_code: "" });
    load();
  }

  async function deleteAddress(addressId) {
    await api.delete(`/addresses/${addressId}`);
    load();
  }

  if (!customer) return <p>Loading...</p>;

  return (
    <div style={{ padding: "20px" }} className="customer-detail">
      <h2>
        {customer.first_name} {customer.last_name}
      </h2>
      <p>Phone: {customer.phone_number}</p>
      <Link to={`/customers/${id}/edit`}>✏️ Edit</Link>

      <h3>Addresses</h3>
      <ul>
        {addresses.map((a) => (
          <li key={a.id}>
            {a.address_details}, {a.city}, {a.state} - {a.pin_code}{" "}
            <button onClick={() => deleteAddress(a.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <h4>Add Address</h4>
      <input
        placeholder="Details"
        value={addr.address_details}
        onChange={(e) => setAddr({ ...addr, address_details: e.target.value })}
      />
      <input
        placeholder="City"
        value={addr.city}
        onChange={(e) => setAddr({ ...addr, city: e.target.value })}
      />
      <input
        placeholder="State"
        value={addr.state}
        onChange={(e) => setAddr({ ...addr, state: e.target.value })}
      />
      <input
        placeholder="PIN"
        value={addr.pin_code}
        onChange={(e) => setAddr({ ...addr, pin_code: e.target.value })}
      />
      <button onClick={addAddress}>Add</button>
    </div>
  );
}
