import type { JSX } from "@builder.io/qwik";
import { component$, type QRL } from "@builder.io/qwik";

type TextareaProps = {
  name: string;
  label?: string;
  placeholder?: string;
  value: string | undefined;
  error?: string;
  required?: boolean;
  ref?: QRL<(element: HTMLTextAreaElement) => void>;
  onInput$: (event: Event, element: HTMLTextAreaElement) => void;
  onChange$?: (event: Event, element: HTMLTextAreaElement) => void;
  onBlur$?: (event: Event, element: HTMLTextAreaElement) => void;
  size?: "small" | "default" | "large";
  status?: "error" | "success";
  icon?: JSX.Element;
};

export const Textarea = component$(
  ({
    label,
    error,
    status = error ? "error" : undefined,
    size = "default",
    icon,
    ...props
  }: TextareaProps) => {
    const { name, required, placeholder } = props;

    const inputClasses = {
      small: "py-2 px-3 text-sm",
      default: "py-3 px-4 text-sm",
      large: "p-4 sm:p-5 text-sm",
    }[size];

    const borderColor =
      status === "error"
        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        : status === "success"
          ? "border-teal-500 focus:border-teal-500 focus:ring-teal-500"
          : "border-gray-200 focus:border-primary-500 focus:ring-primary-500";

    const errorIcon =
      status === "error" ? (
        <svg
          class="size-4 shrink-0 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" x2="12" y1="8" y2="12"></line>
          <line x1="12" x2="12.01" y1="16" y2="16"></line>
        </svg>
      ) : status === "success" ? (
        <svg
          class="size-4 shrink-0 text-teal-500"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      ) : null;

    return (
      <div>
        {label && (
          <label for={name} class="mb-2 block text-sm font-medium">
            {label} {required && <span>*</span>}
          </label>
        )}
        <div class="relative">
          {icon && (
            <div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-4">
              {icon}
            </div>
          )}
          <textarea
            rows={3}
            {...props}
            id={name}
            class={`block w-full rounded-lg ${icon ? "pl-12" : "pl-4"} ${inputClasses} ${borderColor}`}
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-errormessage={error ? `${name}-error` : undefined}
          />
          {errorIcon && (
            <div class="pointer-events-none absolute end-0 top-0 flex items-center p-3">
              {errorIcon}
            </div>
          )}
        </div>
        {error && (
          <div
            id={`${name}-error`}
            class={`text-sm ${status === "error" ? "text-red-600" : "text-teal-600"} mt-2`}
          >
            {error}
          </div>
        )}
      </div>
    );
  },
);
