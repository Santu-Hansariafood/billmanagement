export default function TextArea({
  label,
  name,
  value,
  onChange,
  rows = 3,
  placeholder,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="input-field resize-none"
      />
    </div>
  );
}
