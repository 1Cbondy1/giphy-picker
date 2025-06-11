'use client';

export default function SearchBar({ input, setInput, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="w-full max-w-md mb-6">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search for GIFs..."
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  );
}
