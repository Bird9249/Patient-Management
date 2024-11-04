import type { Signal } from "@builder.io/qwik";
import { component$, useStore } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";
import { AdvancedSelect } from "~/components/forms/advanced-select/AdvancedSelect";
import { Textarea } from "~/components/forms/textarea/Textarea";
import {
  useAppointmentLoader,
  useDoctorSelectLoader,
  useReAppointmentAction,
} from "~/routes/admin_page/details_page/[id]";
import { Modal } from "../Modal";

export const Schedule_Modal = component$<{ isOpen: Signal<boolean> }>(
  ({ isOpen }) => {
    const doctorLoader = useDoctorSelectLoader();
    const loader = useAppointmentLoader();
    const action = useReAppointmentAction();
    const nav = useNavigate();
    const formStore = useStore({
      doctorId: loader.value.data?.doctor.id,
      reasonOfAdmin: "",
    });
    const errorStore = useStore({
      doctorId: "",
      reasonOfAdmin: "",
    });

    return (
      <>
        <Modal isOpen={isOpen} header={{ title: "Schedule Appointment" }}>
          <div>
            <h1 class="mx-4 text-start text-lg text-gray-400">
              Please fill in the following details to schedule
            </h1>
          </div>
          <div class="m-4">
            <AdvancedSelect
              name="doctor-select"
              options={doctorLoader.value.map(({ id, name, image }) => ({
                label: name,
                value: id,
                img: import.meta.env.PUBLIC_IMAGE_URL + "/" + image,
              }))}
              onSelected$={(val) => {
                formStore.doctorId = typeof val === "number" ? val : val[0];
              }}
              value={formStore.doctorId}
              placeholder="Select your doctor"
              required
              label="Doctor"
              error={errorStore.doctorId}
            />
          </div>

          <div class="mx-4 flex flex-row space-x-6">
            <div class="flex-1">
              <Textarea
                onInput$={(e, _) => {
                  formStore.reasonOfAdmin = _.value;
                }}
                name="reasonOfAdmin"
                value={formStore.reasonOfAdmin}
                label="Reason for Schedule"
                placeholder="ex:Okay"
                size="large"
                error={errorStore.reasonOfAdmin}
              />
            </div>
          </div>
          <div class="mx-auto flex flex-col items-center p-5">
            <button
              type="button"
              class="mb-10 block w-full rounded-lg bg-emerald-400 px-5 py-3 text-white"
              onClick$={async () => {
                const res = await action.submit({
                  doctorId: formStore.doctorId,
                  reasonOfAdmin: formStore.reasonOfAdmin,
                });

                if (res.value.data.success) {
                  await nav(`/admin_page`);
                } else {
                  if (res.value.data.type === "validate") {
                    errorStore.doctorId = res.value.data.errors!.nested![
                      "doctorId"
                    ]
                      ? res.value.data.errors!.nested!["doctorId"][0]
                      : "";

                    errorStore.reasonOfAdmin = res.value.data.errors!.nested![
                      "reasonOfAdmin"
                    ]
                      ? res.value.data.errors!.nested!["reasonOfAdmin"][0]
                      : "";
                  }
                }
              }}
            >
            Confirm Schedule
            </button>
          </div>
        </Modal>
      </>
    );
  },
);
