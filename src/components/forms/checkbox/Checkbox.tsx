import { component$, type QRL } from "@builder.io/qwik";

type CheckboxProps = {
  ref: QRL<(element: HTMLInputElement) => void>;
  name: string;
  value?: string;
  checked?: boolean;
  onInput$: (event: Event, element: HTMLInputElement) => void;
  onChange$: (event: Event, element: HTMLInputElement) => void;
  onBlur$: (event: Event, element: HTMLInputElement) => void;
  required?: boolean;
  label: string;
  error?: string;
};

export const Checkbox = component$(
  ({ label, error, ...props }: CheckboxProps) => {
    const { name, required } = props;
    return (
      <div class="flex items-center">
        <input
          {...props}
          class="mt-0.5 shrink-0 rounded border-gray-200 text-primary-600 focus:ring-primary-500 disabled:pointer-events-none disabled:opacity-50"
          type="checkbox"
          id={name}
          aria-invalid={!!error}
          aria-errormessage={`${name}-error`}
        />
        <label for={name} class="ms-3 text-sm text-gray-500">
          {label} {required && <span>*</span>}
        </label>
        {error && (
          <div
            id={`${name}-error`}
            class={`ml-2 text-sm ${error ? "text-red-600" : "text-teal-600"}`}
          >
            {error}
          </div>
        )}
      </div>
    );
  },
);
