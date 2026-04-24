import { useState } from "react"; 
import PageHeader from "../components/pageHeader";
import ord from "../assets/Orders.json";

const statusStyle = {
  Completed: "bg-green-100 text-green-700 border border-green-300",
  Pending: "bg-yellow-100 text-yellow-700 border border-yellow-300",
  Cancelled: "bg-red-100 text-red-600 border border-red-300",
};

const emptyForm = {
  order_id: "",
  customer_name: "",
  order_date: "",
  total_price: "",
  status: "Pending",
};

export default function Order() {
  const [orders, setOrders] = useState(ord);       
  const [showForm, setShowForm] = useState(false); 
  const [form, setForm] = useState(emptyForm);     

  // update state form tiap input berubah
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // kirim data ke Express lalu update tabel
  const handleSubmit = async () => {
    const newOrder = { ...form, total_price: Number(form.total_price) };

    const res = await fetch("http://localhost:3001/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOrder),
    });

    if (res.ok) {
      setOrders([...orders, newOrder]);
      setShowForm(false);
      setForm(emptyForm);
    }
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Order"
        bread="Order"
        children="Order"
        onAdd={() => setShowForm(true)} 
      />

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left px-6 py-3 text-gray-500 font-semibold uppercase tracking-wide text-xs">Order ID</th>
              <th className="text-left px-6 py-3 text-gray-500 font-semibold uppercase tracking-wide text-xs">Customer</th>
              <th className="text-left px-6 py-3 text-gray-500 font-semibold uppercase tracking-wide text-xs">Date</th>
              <th className="text-left px-6 py-3 text-gray-500 font-semibold uppercase tracking-wide text-xs">Total</th>
              <th className="text-left px-6 py-3 text-gray-500 font-semibold uppercase tracking-wide text-xs">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {orders.map((item) => ( 
              <tr key={item.order_id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-gray-400 font-mono text-xs">{item.order_id}</td>
                <td className="px-6 py-4 font-medium text-gray-800">{item.customer_name}</td>
                <td className="px-6 py-4 text-gray-500">{item.order_date}</td>
                <td className="px-6 py-4 text-gray-800 font-medium">
                  Rp {item.total_price.toLocaleString("id-ID")}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusStyle[item.status]}`}>
                    {item.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL FORM */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Add New Order</h2>

            <div className="space-y-3">
              {[
                { label: "Order ID", name: "order_id", type: "text" },
                { label: "Customer Name", name: "customer_name", type: "text" },
                { label: "Order Date", name: "order_date", type: "date" },
                { label: "Total Price", name: "total_price", type: "number" },
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
                <label className="block text-xs font-semibold text-gray-500 mb-1">Status</label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  <option>Pending</option>
                  <option>Completed</option>
                  <option>Cancelled</option>
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
                Save Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}