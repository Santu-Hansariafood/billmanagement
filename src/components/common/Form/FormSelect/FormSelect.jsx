"use client";

export default function FormSelect({
  label,
  name,
  value,
  onChange,
  options = [],
  required,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>

      <select
        name={name}
        value={value}
        onChange={onChange}
        className="input-field"
        required={required}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
