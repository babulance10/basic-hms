interface FieldGroupProps {
  name?: string;
  label?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

export default function FieldGroup({
  label,
  name,
  error,
  className,
  children
}: FieldGroupProps) {
  return (
    <div className={`space-y-2 ${className || ''}`}>
      {label && (
        <label className="block text-gray-800 select-none" htmlFor={name}>
          {label}:
        </label>
      )}
      {children}
      {error && <div className="text-red-500 mt-2 text-sm">{error}</div>}
    </div>
  );
}
