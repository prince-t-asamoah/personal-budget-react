import { forwardRef } from "react";
import type { RefObject, SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label: string;
  error?: string;
  options: { name: string; value: string }[];
  defaultOption?:{ name: string; value: string };
};

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ id, label, options, error, defaultOption, ...props }, ref) => {
    const setRef = (element: HTMLSelectElement | null) => {
      if (typeof ref === "function") {
        ref(element);
      } else if (ref && element) {
        (ref as RefObject<HTMLSelectElement>).current = element;
      }
    };

    return (
      <div className={`form-group ${error ? "error" : ""}`}>
        <label htmlFor={id}>{label}</label>
        <select ref={setRef} id={id} {...props}>
          {options.length === 0 ? (
            <option value="">No options available</option>
          ) : (
            <>
              {defaultOption && (
                <option value={defaultOption.value}>{defaultOption.name}</option>
              )}
              {options.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.name}
                </option>
              ))}
            </>
          )}
        </select>
        <span className={`error-message ${error ? "show" : ""} `}>{error}</span>
      </div>
    );
  },
);

Select.displayName = "Select";

export default Select;
