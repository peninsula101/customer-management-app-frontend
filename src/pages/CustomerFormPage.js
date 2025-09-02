import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../api";
import "../styles/CustomerForm.css";


export default function CustomerFormPage() {
  const nav = useNavigate();
  const { id } = useParams();
  const editing = Boolean(id);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
  });

  useEffect(() => {
    if (editing) {
      api.get(`/customers/${id}`).then((res) => {
        setForm(res.data.data);
      });
    }
  }, [editing, id]);

  async function save() {
    if (!form.first_name || !form.last_name || !form.phone_number) {
      alert("All fields are required");
      return;
    }
    try {
      if (editing) await api.put(`/customers/${id}`, form);
      else await api.post("/customers", form);
      nav("/");
    } catch (e) {
      alert(e.response?.data?.error || "Error saving customer");
    }
  }

  return (
      <div style={{ padding: "20px" }} className="customer-form">
      <h1>{editing ? "Edit" : "New"} Customer</h1>
      <input
        placeholder="First Name"
        value={form.first_name}
        onChange={(e) => setForm({ ...form, first_name: e.target.value })}
      />
      <br />
      <input
        placeholder="Last Name"
        value={form.last_name}
        onChange={(e) => setForm({ ...form, last_name: e.target.value })}
      />
      <br />
      <input
        placeholder="Phone"
        value={form.phone_number}
        onChange={(e) => setForm({ ...form, phone_number: e.target.value })}
      />
      <br />
      <button onClick={save}>{editing ? "Update" : "Create"}</button>
    </div>
  );
}
