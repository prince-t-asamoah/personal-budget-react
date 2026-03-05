import { forwardRef } from "react";
import type { RefObject, TextareaHTMLAttributes } from "react";

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  id: string;
  label: string;
  error?: string;
};

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ id, label, error, ...props }, ref) => {
    const setRef = (element: HTMLTextAreaElement | null) => {
      if (typeof ref === "function") {
        ref(element);
      } else if (ref && element) {
        (ref as RefObject<HTMLTextAreaElement>).current = element;
      }
    };

    return (
      <div className="form-group">
        <label htmlFor={id}>
          {label}
          {/* {required && <span className="required">*</span>} */}
        </label>

        <textarea ref={setRef} id={id} {...props}></textarea>
        <span className={`error-message ${error ? "show" : ""}`}>{error}</span>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";

export default Textarea;
