"use client";
export default function EnquiryModal({ enquiry, onChange, onSubmit, onClose, enquirySent }) {
  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-30">
      <form
        onSubmit={onSubmit}
        className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md flex flex-col gap-4 relative"
      >
        <button
          type="button"
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold text-green-800 mb-2">Wholesale Enquiry</h2>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={enquiry.name}
          onChange={onChange}
          required
          className="border rounded px-3 py-2 placeholder-gray-500"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={enquiry.email}
          onChange={onChange}
          required
          className="border rounded px-3 py-2 placeholder-gray-500"
        />
        <textarea
          name="message"
          placeholder="Your Message"
          value={enquiry.message}
          onChange={onChange}
          required
          className="border rounded px-3 py-2 placeholder-gray-500"
        />
        <button
          type="submit"
          className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition"
        >
          {enquirySent ? "Enquiry Sent!" : "Send Enquiry"}
        </button>
      </form>
    </div>
  );
} 