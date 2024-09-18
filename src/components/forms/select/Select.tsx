import { component$, type QRL, useSignal, useTask$ } from "@builder.io/qwik";

type SelectProps = {
  ref: QRL<(element: HTMLSelectElement) => void>;
  name: string;
  value: string | string[] | null | undefined;
  onInput$: (event: Event, element: HTMLSelectElement) => void;
  onChange$: (event: Event, element: HTMLSelectElement) => void;
  onBlur$: (event: Event, element: HTMLSelectElement) => void;
  options: { label: string; value: string }[];
  size?: "small" | "default" | "large";
  placeholder?: string;
  required?: boolean;
  class?: string;
  label?: string;
  error?: string;
  status?: "error" | "success";
};

export const Select = component$(
  ({
    value,
    options,
    label,
    error,
    status = error ? "error" : undefined,
    size = "default",
    ...props
  }: SelectProps) => {
    const { name, required, placeholder } = props;

    const values = useSignal<string[]>();
    useTask$(({ track }) => {
      track(() => value);
      values.value = Array.isArray(value)
        ? value
        : value && typeof value === "string"
          ? [value]
          : [];
    });

    // Determine styles based on size and status
    const selectClasses = {
      small: "py-2 px-3 pe-9 text-sm",
      default: "py-3 px-4 pe-9 text-sm",
      large: "sm:p-5 p-4 pe-9 text-sm",
    }[size];

    const borderColor =
      status === "error"
        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
        : status === "success"
          ? "border-teal-500 focus:border-teal-500 focus:ring-teal-500"
          : "border-gray-200 focus:border-blue-500 focus:ring-blue-500";

    return (
      <div class={`relative ${props.class}`}>
        {label && (
          <label for={name} class="mb-2 block text-sm font-medium">
            {label} {required && <span>*</span>}
          </label>
        )}
        <div class="relative flex items-center">
          <select
            {...props}
            id={name}
            class={`block w-full rounded-lg ${selectClasses} ${borderColor} disabled:pointer-events-none disabled:opacity-50`}
            aria-invalid={!!error}
            aria-errormessage={error ? `${name}-error` : undefined}
          >
            <option value="" disabled hidden selected={!value}>
              {placeholder}
            </option>
            {options.map(({ label, value }) => (
              <option
                key={value}
                value={value}
                selected={values.value?.includes(value)}
              >
                {label}
              </option>
            ))}
          </select>
          {status === "error" && (
            <div class="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-8">
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
            </div>
          )}
          {status === "success" && (
            <div class="pointer-events-none absolute inset-y-0 end-0 flex items-center pe-8">
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
