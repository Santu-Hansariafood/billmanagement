export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  placeholder,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        className="input-field"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
    </div>
  );
}
