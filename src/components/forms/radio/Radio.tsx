import { component$, type QRL } from "@builder.io/qwik";

type RedioProps = {
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

export const Radio = component$(({ label, error, ...props }: RedioProps) => {
  const { name, required } = props;

  return (
    <div class="w-full">
      <label
        for={name}
        class="flex w-full rounded-lg border border-gray-200 bg-white p-3 text-sm focus:border-primary-500 focus:ring-primary-500"
      >
        <input
          {...props}
          type="radio"
          class="mt-0.5 shrink-0 rounded-full border-gray-200 text-primary-600 focus:ring-primary-500 disabled:pointer-events-none disabled:opacity-50"
          id={name}
          aria-invalid={!!error}
          aria-errormessage={`${name}-error`}
        />
        <span class="ms-3 text-sm text-gray-500">
          {label}
          {required && <span class="text-red-500">*</span>}
        </span>
      </label>

      {error && (
        <div
          id={`${name}-error`}
          class={`mt-2 text-sm ${error ? "text-red-600" : "text-teal-600"}`}
        >
          {error}
        </div>
      )}
    </div>
  );
});
