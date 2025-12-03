export default function FormButtons({ onCancel, submitLabel = "Save" }) {
  return (
    <div className="flex justify-end space-x-3 pt-4">
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-2.5 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
      >
        Cancel
      </button>

      <button type="submit" className="btn-primary flex items-center space-x-2">
        <span>{submitLabel}</span>
      </button>
    </div>
  );
}
