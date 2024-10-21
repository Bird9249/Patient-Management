import type { Signal } from "@builder.io/qwik";
import { component$, useStore } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { Textarea } from "~/components/forms/textarea/Textarea";
import { useCancelAppointmentAction } from "~/routes/admin_page/details_page/[id]";
import { Modal } from "../Modal";

export const Cancel_Modal = component$<{ isOpen: Signal<boolean> }>(
  ({ isOpen }) => {
    const action = useCancelAppointmentAction();
    const nav = useNavigate();
    const formCancelStore = useStore({
      reasonOfAdmin: "",
    });
    const errorCancelStore = useStore({
      reasonOfAdmin: "",
    });

    return (
      <>
        <Modal isOpen={isOpen} header={{ title: "Cancel Appointment" }}>
          <div>
            <h1 class="my-2 mx-4 text-start text-base text-gray-400">
              Are you sure you want to cancel your patient appointment
            </h1>
          </div>

          <div class="mx-4 flex flex-row space-x-6">
            <div class="flex-1">
              <Textarea
                onInput$={(e, _) => {
                  formCancelStore.reasonOfAdmin = _.value;
                }}
                name="reasonOfAdmin"
                value={formCancelStore.reasonOfAdmin}
                label="Reason for cancellation"
                placeholder="ex:we're sorry"
                size="large"
                error={errorCancelStore.reasonOfAdmin}
              />
            </div>
          </div>
          <div class="mx-auto flex flex-col items-center p-5">
            <button
              type="button"
              class="m-4 block w-full rounded-lg bg-red-600 px-5 py-3 text-white"
              onClick$={async () => {
                const res = await action.submit({
                  reasonOfAdmin: formCancelStore.reasonOfAdmin,
                });

                if (res.value.data.success) {
                  await nav(`/admin_page`);
                } else {
                  if (res.value.data.type === "validate") {
                    errorCancelStore.reasonOfAdmin = res.value.data.errors!
                      .nested!["reasonOfAdmin"]
                      ? res.value.data.errors!.nested!["reasonOfAdmin"][0]
                      : "";
                  }
                }
              }}
            >
              Confirm to Cancel
            </button>
          </div>
        </Modal>
      </>
    );
  },
);
