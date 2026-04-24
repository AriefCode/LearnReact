import { useState } from "react"; // 🆕
import PageHeader from "../components/pageHeader";
import cust from "../assets/Customer.json";

const loyaltyStyle = {
  Gold:   "bg-yellow-100 text-yellow-700 border border-yellow-300",
  Silver: "bg-slate-100 text-slate-600 border border-slate-300",
  Bronze: "bg-orange-100 text-orange-700 border border-orange-300",
};

// 🆕
const emptyForm = {
  customer_id: "",
  customer_name: "",
  email: "",
  phone: "",
  loyalty: "Bronze",
};

export default function Customer() {
  const [customers, setCustomers] = useState(cust); // 🆕
  const [showForm, setShowForm] = useState(false);  // 🆕
  const [form, setForm] = useState(emptyForm);      // 🆕

  // 🆕
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🆕
  const handleSubmit = async () => {
    const res = await fetch("http://localhost:3001/api/customers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setCustomers([...customers, form]);
      setShowForm(false);
      setForm(emptyForm);
    }
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Customer"
        bread="Customer"
        children="Customer"
        onAdd={() => setShowForm(true)} // 🆕
      />

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-gray-500 font-semibold uppercase tracking-wide text-xs">ID</th>
              <th className="text-left px-6 py-3 text-gray-500 font-semibold uppercase tracking-wide text-xs">Name</th>
              <th className="text-left px-6 py-3 text-gray-500 font-semibold uppercase tracking-wide text-xs">Email</th>
              <th className="text-left px-6 py-3 text-gray-500 font-semibold uppercase tracking-wide text-xs">Phone</th>
              <th className="text-left px-6 py-3 text-gray-500 font-semibold uppercase tracking-wide text-xs">Loyalty</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {customers.map((item) => ( // ✏️ cust → customers
              <tr key={item.customer_id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-400 font-mono text-xs">{item.customer_id}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{item.customer_name}</td>
                <td className="px-6 py-4 text-gray-500">{item.email}</td>
                <td className="px-6 py-4 text-gray-500">{item.phone}</td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${loyaltyStyle[item.loyalty]}`}>
                    {item.loyalty}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🆕 MODAL FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Add New Customer</h2>

            <div className="space-y-3">
              {[
                { label: "Customer ID", name: "customer_id", type: "text" },
                { label: "Customer Name", name: "customer_name", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Phone", name: "phone", type: "text" },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block text-xs font-semibold text-gray-500 mb-1">{label}</label>
                  <input
                    type={type}
                    name={name}
                    value={form[name]}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">Loyalty</label>
                <select
                  name="loyalty"
                  value={form.loyalty}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  <option>Bronze</option>
                  <option>Silver</option>
                  <option>Gold</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold"
              >
                Save Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}