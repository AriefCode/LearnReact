export default function Toast({ message, visible }) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-6 right-6 z-[100] max-w-sm toast-slide-in ${
        visible ? "is-visible" : ""
      }`}
    >
      <div className="bg-white shadow-lg rounded-lg px-5 py-4 border-l-4 border-hijau text-teks font-medium">
        {message}
      </div>
    </div>
  );
}
