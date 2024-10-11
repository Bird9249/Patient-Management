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
    const formStore = useStore({
      reasonOfAdmin: "",
    });
    const errorStore = useStore({
      reasonOfAdmin: "",
    });

    return (
      <>
        <Modal isOpen={isOpen} header={{ title: "Cancel Appointment" }}>
          <div>
            <h1 class="mx-4 text-start text-lg text-gray-400">
              Are you sure you want to cancel your patient appointment
            </h1>
          </div>

          <div class="mx-4 flex flex-row space-x-6">
            <div class="flex-1">
              <Textarea
                onInput$={(e, _) => {
                  formStore.reasonOfAdmin = _.value;
                }}
                name="reasonOfAdmin"
                value={formStore.reasonOfAdmin}
                label="Reason for cancellation"
                placeholder="ex:we're sorry"
                size="large"
                error={errorStore.reasonOfAdmin}
              />
            </div>
          </div>
          <div class="mx-auto flex flex-col items-center p-5">
            <button
              type="button"
              class="mb-10 block w-full rounded-lg bg-red-600 px-5 py-3 text-white"
              onClick$={async () => {
                const res = await action.submit({
                  reasonOfAdmin: formStore.reasonOfAdmin,
                });

                if (res.value.data.success) {
                  await nav(`/admin_page`);
                } else {
                  if (res.value.data.type === "validate") {
                    errorStore.reasonOfAdmin = res.value.data.errors!.nested![
                      "reasonOfAdmin"
                    ]
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
