"use client";

export function PrimaryButton({ children, icon: Icon, ...props }) {
  return (
    <button
      {...props}
      className="btn-primary flex-1 flex items-center justify-center space-x-2"
    >
      {Icon && <Icon className="w-4 h-4" />}
      <span>{children}</span>
    </button>
  );
}

export function SecondaryButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
    >
      {children}
    </button>
  );
}
