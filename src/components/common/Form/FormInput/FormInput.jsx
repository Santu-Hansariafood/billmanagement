"use client";

export default function FormInput({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder,
  required,
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
        required={required}
      />
    </div>
  );
}
