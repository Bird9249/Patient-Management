/* eslint-disable qwik/jsx-img */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import type { PropFunction } from "@builder.io/qwik";
import { $, component$, useSignal } from "@builder.io/qwik";
import { Image } from "@unpic/qwik";

interface FileUploadProps {
  id: string;
  name: string;
  label?: string;
  browseText: string;
  maxSizeText: string;
  onFileSelect$: PropFunction<(file: File | null) => void>;
  error?: string;
  status?: "error" | "success";
  size?: "small" | "default" | "large";
}

export default component$(
  ({
    label,
    error,
    status = error ? "error" : undefined,
    size = "default",
    browseText,
    maxSizeText,
    onFileSelect$,
    ...props
  }: FileUploadProps) => {
    const imageSrc = useSignal<string | null>(null);

    const handleFileChange = $((event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files[0]) {
        const file = input.files[0];
        onFileSelect$(file);

        // Display preview of the selected image
        const reader = new FileReader();
        reader.onload = (e) => {
          imageSrc.value = e.target?.result as string;
        };
        reader.readAsDataURL(file);
      } else {
        onFileSelect$(null);
        imageSrc.value = null;
      }
    });

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
          <label for={props.id} class="mb-2 block text-sm font-medium">
            {label}
          </label>
        )}
        <div class="relative">
          <label
            for={props.id}
            class={`group block cursor-pointer rounded-lg border-2 border-dashed ${borderColor} p-4 text-center focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 sm:p-7 ${inputClasses}`}
          >
            <input
              id={props.id}
              name={props.name}
              type="file"
              class="sr-only"
              onChange$={handleFileChange}
            />
            {imageSrc.value ? (
              <div class="mb-2">
                <Image
                  src={imageSrc.value}
                  alt="Preview"
                  class="mx-auto h-auto max-w-full rounded-lg"
                  layout="constrained"
                  width={0}
                  height={0}
                />
              </div>
            ) : (
              <>
                <svg
                  class="mx-auto size-10 text-gray-400"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill-rule="evenodd"
                    d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z"
                  />
                  <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                </svg>
                <span class="mt-2 block text-sm text-gray-800">
                  {browseText}{" "}
                  <span class="text-primary-600 group-hover:text-primary-700">
                    drag 'n drop
                  </span>
                </span>
                <span class="mt-1 block text-xs text-gray-500 dark:text-neutral-500">
                  {maxSizeText}
                </span>
              </>
            )}

            {errorIcon && (
              <div class="pointer-events-none absolute end-0 top-0 flex items-center p-3">
                {errorIcon}
              </div>
            )}
          </label>
        </div>
        {error && (
          <div
            id={`${props.id}-error`}
            class={`text-sm ${status === "error" ? "text-red-600" : "text-teal-600"} mt-2`}
          >
            {error}
          </div>
        )}
      </div>
    );
  },
);
