"use client";

export default function FormHeading({ title, onClose }) {
  return (
    <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>

      {onClose && (
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg
            className="w-5 h-5 text-gray-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
