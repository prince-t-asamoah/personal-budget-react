import { forwardRef } from "react";
import type { InputHTMLAttributes, RefObject } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  error?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, type = "text", error, ...props }, ref) => {
    const setRef = (element: HTMLInputElement | null) => {
      if (typeof ref === "function") {
        ref(element);
      } else if (ref && element) {
        (ref as RefObject<HTMLInputElement>).current = element;
      }
    };

    return (
      <div className="form-group">
        <label htmlFor={id}>
          {label}
          {/* {required && <span className="required">*</span>} */}
        </label>

        <input ref={setRef} id={id} type={type} {...props} />
        <span className={`error-message ${error ? "show" : ""} `}>{error}</span>
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
