/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable qwik/no-use-visible-task */
import type { QRL, Signal } from "@builder.io/qwik";
import {
  $,
  Slot,
  component$,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { Button } from "../router-head/button/Button";
import "./modal.css";

export const Modal = component$<{
  isOpen: Signal<boolean>;
  contentClass?: string;
  header?: {
    title: string;
  };
  footer?: {
    btnProps: { label: string };
    onSubmit$: QRL<() => void>;
  };
}>(({ isOpen, contentClass, header, footer }) => {
  const isAnimating = useSignal(false);

  const closeModal = $(() => {
    isAnimating.value = true;
    setTimeout(() => {
      isOpen.value = false;
      isAnimating.value = false;
    }, 300);
  });

  useVisibleTask$(({ track }) => {
    track(() => isOpen.value);
    if (isOpen.value) {
      isAnimating.value = true;
      setTimeout(() => {
        isAnimating.value = false;
      }, 300);
    }
  });

  return (
    <>
      {isOpen.value && (
        <div
          class={`fixed inset-0 z-[70] flex items-center justify-center bg-gray-600 bg-opacity-50 transition-opacity ${isAnimating.value ? "opacity-0" : "opacity-100"}`}
          onClick$={closeModal}
        >
          <div
            class={`w-screen sm:mx-auto sm:w-full sm:max-w-lg ${contentClass}`}
          >
            <div
              class={`pointer-events-auto flex w-full flex-col rounded-xl border bg-white shadow-sm  ${isOpen.value && !isAnimating.value ? "modal-enter" : "modal-exit"}`}
              onClick$={(e) => e.stopPropagation()}
              role="dialog"
              tabIndex={-1}
              aria-labelledby="modal"
            >
              {header ? (
                <div class="flex items-center justify-between border-b px-4 py-3">
                  <h3 id="hs-basic-modal-label" class="font-bold text-gray-800">
                    {header.title}
                  </h3>
                  <button
                    onClick$={() => {
                      isOpen.value = false;
                    }}
                    type="button"
                    class="inline-flex size-8 items-center justify-center gap-x-2 rounded-full border border-transparent bg-gray-100 text-gray-800 hover:bg-gray-200 focus:bg-gray-200 focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                    aria-label="Close"
                  >
                    <span class="sr-only">Close</span>
                    <svg
                      class="size-4 shrink-0"
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
                      <path d="M18 6 6 18"></path>
                      <path d="m6 6 12 12"></path>
                    </svg>
                  </button>
                </div>
              ) : (
                <></>
              )}
              <div class="overflow-y-auto p-4">
                <Slot />
              </div>
              {footer ? (
                <div class="flex items-center justify-end gap-x-2 border-t px-4 py-3">
                  <Button
                    variant="white"
                    size="small"
                    onClick$={() => {
                      isOpen.value = false;
                    }}
                  >
                    Close
                  </Button>
                  <Button size="small" onClick$={footer.onSubmit$}>
                    {footer.btnProps.label}
                  </Button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
});
