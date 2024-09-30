/* eslint-disable qwik/jsx-img */
import {
  $,
  component$,
  type QRL,
  useOnWindow,
  useSignal,
  useTask$,
} from "@builder.io/qwik";

export type SelectOption = {
  label: string;
  value: number;
  img?: string;
};

type SelectProps = {
  ref?: QRL<(element: HTMLDivElement) => void>;
  name: string;
  value: number | number[] | null | undefined;
  onSelected$: QRL<(value: number | number[]) => void>;
  options: SelectOption[];
  multiple?: boolean;
  placeholder?: string;
  required?: boolean;
  class?: string;
  label?: string;
  error?: string;
};

export const AdvancedSelect = component$(
  ({ value, options, label, error, ...props }: SelectProps) => {
    const { name, required, multiple, placeholder, onSelected$ } = props;

    const dropdownRef = useSignal<HTMLElement>();
    const values = useSignal<number[]>([]);
    const isOpen = useSignal(false);

    useTask$(({ track }) => {
      track(() => value);
      values.value = Array.isArray(value) ? value : value ? [value] : [];
    });

    const toggleDropdown = $(() => {
      isOpen.value = !isOpen.value;
    });

    useOnWindow(
      "click",
      $((event) => {
        const dropdownElement = dropdownRef.value;
        const target = event.target as HTMLElement;
        if (
          dropdownElement &&
          !dropdownElement.contains(target) &&
          !target.closest(".prevent-close")
        ) {
          isOpen.value = false;
        }
      }),
    );

    return (
      <div class="relative">
        {label && (
          <label for={name} class="mb-2 block text-sm font-medium">
            {label} {required && <span>*</span>}
          </label>
        )}
        <div class="relative">
          <div
            class={`relative flex w-full cursor-pointer flex-wrap gap-x-2 text-nowrap rounded-lg border bg-white pe-9 ps-0.5 text-start text-sm focus:outline-none focus:ring-2 focus:ring-primary-500  ${error ? "border-red-500" : "border-gray-200"} ${props.class}`}
            onClick$={toggleDropdown}
          >
            {values.value.length > 0 &&
              values.value.map((val, idx) => {
                const option = options.find((opt) => opt.value === val);
                return (
                  <div
                    class="relative z-10 m-1 flex flex-nowrap items-center rounded-full border border-gray-200 bg-white p-1"
                    key={idx}
                  >
                    <div class="me-1 size-6" data-icon="">
                      <img
                        class="inline-block rounded-full"
                        src={option?.img}
                        alt={option?.label}
                      />
                    </div>
                    <div class="whitespace-nowrap text-gray-800" data-title="">
                      {option?.label}
                    </div>
                    {/* <div
                      class="prevent-close ms-2 inline-flex size-5 shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-sm text-gray-800 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                      onClick$={(event) => {
                        event.stopPropagation();
                        values.value = values.value.filter((v) => v !== val);

                        onSelected$(values.value);
                      }}
                    >
                      <svg
                        class="size-3 shrink-0"
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
                        <path d="M18 6L6 18"></path>
                        <path d="M6 6l12 12"></path>
                      </svg>
                    </div> */}
                  </div>
                );
              })}
            <div class="order-1 rounded-lg px-2 py-3 text-sm outline-none focus:border-0">
              {values.value.length <= 0 && placeholder}
            </div>
            <svg
              class="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </div>

          {isOpen.value && (
            <div
              ref={dropdownRef}
              class={`absolute z-50 mt-2 max-h-72 w-full space-y-0.5 overflow-hidden overflow-y-auto rounded-lg border border-gray-200 bg-white p-1`}
            >
              {options.map(({ label, value, img }) => (
                <div
                  key={value}
                  onClick$={() => {
                    const optionValue = value; // Use option.value from your context

                    if (multiple) {
                      // Handle multiple selection
                      if (values.value.includes(optionValue)) {
                        values.value = values.value.filter(
                          (val) => val !== optionValue,
                        );
                      } else {
                        values.value = [...values.value, optionValue];
                      }
                    } else {
                      // Handle single selection
                      values.value = [optionValue];
                      isOpen.value = false;
                    }

                    onSelected$(values.value);
                  }}
                  class={`w-full cursor-pointer rounded-lg px-4 py-2 text-sm text-gray-800 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none`}
                >
                  <div class="flex w-full items-center justify-between">
                    <div class="flex items-center">
                      {img && (
                        <div class="me-2 size-8">
                          <img
                            class="inline-block max-w-full rounded-full"
                            src={img}
                          />
                        </div>
                      )}
                      <div class="text-sm font-semibold text-gray-800">
                        {label}
                      </div>
                    </div>
                    {values.value.includes(value) && (
                      <svg
                        class="h-4 w-4 text-blue-600"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
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
  },
);
