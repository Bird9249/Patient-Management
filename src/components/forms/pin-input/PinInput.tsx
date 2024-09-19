import type { PropFunction } from "@builder.io/qwik";
import { $, component$ } from "@builder.io/qwik";

type PinInputProps = {
  length: number;
  value: string[];
  onChange$: PropFunction<(value: string[]) => void>;
};

export const PinInput = component$(
  ({ length, value, onChange$ }: PinInputProps) => {
    const handleInput = $((event: Event, index: number) => {
      const input = event.target as HTMLInputElement;
      const newValue = [...value];
      newValue[index] = input.value;
      onChange$(newValue);

      if (input.value && index < length - 1) {
        const nextInput = document.querySelectorAll("input")[
          index + 1
        ] as HTMLInputElement;
        nextInput.focus();
      }
    });

    const handleKeyDown = $((event: KeyboardEvent, index: number) => {
      const input = event.target as HTMLInputElement;
      if (event.key === "Backspace" && !input.value && index > 0) {
        const prevInput = document.querySelectorAll("input")[
          index - 1
        ] as HTMLInputElement;
        prevInput.focus();
      }
    });

    return (
      <div class="flex gap-x-3">
        {Array.from({ length }).map((_, index) => (
          <input
            key={index}
            type="text"
            class="block w-[38px] rounded-md border-gray-200 text-center text-sm focus:border-blue-500 focus:ring-primary-500 disabled:pointer-events-none disabled:opacity-50"
            value={value[index] || ""}
            onInput$={(event) => handleInput(event, index)}
            onKeyDown$={(event) => handleKeyDown(event, index)}
            maxLength={1}
            aria-label={`Pin digit ${index + 1}`}
            placeholder="⚬"
          />
        ))}
      </div>
    );
  },
);
