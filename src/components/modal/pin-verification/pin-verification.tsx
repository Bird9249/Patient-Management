import type { Signal } from "@builder.io/qwik";
import { component$, useSignal } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Button } from "~/components/button/Button";
import { PinInput } from "~/components/forms/pin-input/PinInput";
import { Modal } from "~/components/modal/Modal";
import { useVerifyLogInAction } from "~/routes/log_in";

export const PinVerification = component$<{ isOpen: Signal<boolean> }>(
  ({ isOpen }) => {
    // const isOpen = useSignal<boolean>(true);
    const nav = useNavigate();
    const action = useVerifyLogInAction();
    const value = useSignal<string>("");
    const error = useSignal<string>("");
    return (
      <div>
        <Modal isOpen={isOpen} header={{ title: "Access Verification" }}>
          <div>
            <h1 class="mx-4 text-sm text-gray-500">
              To access the admin page, please enter the passkey
            </h1>
            <div class="my-10 flex items-center justify-center">
              <div class="space-y-4">
                <PinInput
                  length={6}
                  value={value.value.split("")}
                  onChange$={(val) => {
                    value.value = val.join("");
                  }}
                />
                {error.value && <p class="text-red-500">{error.value}</p>}
              </div>
            </div>
            <div class="m-5 flex items-center justify-center">
              <Button
                block
                onClick$={async () => {
                  const res = await action.submit({ passkey: value.value });
                  if (res.value.data?.success) {
                    isOpen.value = false;
                    await nav("/admin_page/");
                  } else {
                    error.value = res.value.errors!.passkey;
                  }
                }}
                isLoading={action.isRunning}
              >
                Enter Admin Panel
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  },
);
